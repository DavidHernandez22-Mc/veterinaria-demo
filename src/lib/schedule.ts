import type { Species } from "./site";

export type PlanInput = {
  species: Species;
  name: string;
  ageValue: number;
  ageUnit: "meses" | "años";
  lastVaccine: string | null; // yyyy-mm-dd
  lastDeworm: string | null;
  today?: Date;
};

export type Kind = "vacuna" | "desparasitacion" | "chequeo";

export type PlanItem = {
  date: Date;
  kind: Kind;
  title: string;
  sentence: string;
  overdue: boolean;
};

const DAY = 86_400_000;
const ORDINALS = ["primera", "segunda", "tercera", "cuarta"];
const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * DAY);
function addMonths(d: Date, n: number) {
  const r = new Date(d);
  r.setMonth(r.getMonth() + n);
  return r;
}
export function parseISO(s: string | null) {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export const monthName = (d: Date) => MONTHS[d.getMonth()];
export function formatDate(d: Date) {
  return `${d.getDate()} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()}`;
}
export function formatShort(d: Date) {
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`;
}

/**
 * General guide only. The vet confirms the real plan in the consult.
 * Puppy and kitten series follow the usual 3–4 week spacing up to 16 weeks,
 * then yearly boosters. Deworming every 2 weeks until 3 months, monthly until 6,
 * then every 3 months. Seniors get a check-up every 6 months.
 */
export function buildPlan(input: PlanInput): PlanItem[] {
  const today = startOfDay(input.today ?? new Date());
  const horizon = addMonths(today, 13);
  const ageDays = Math.round(input.ageValue * (input.ageUnit === "meses" ? 30.4 : 365.25));
  const birth = addDays(today, -ageDays);
  const n = input.name.trim() || (input.species === "perro" ? "Tu perro" : "Tu gato");
  const ageAt = (d: Date) => (d.getTime() - birth.getTime()) / DAY;
  const soon = addDays(today, 3);
  const items: PlanItem[] = [];
  const lastVac = parseISO(input.lastVaccine);
  const lastDew = parseISO(input.lastDeworm);
  const vaccineName = input.species === "perro" ? "vacuna múltiple" : "vacuna triple felina";

  // Vaccines
  if (ageDays < 16 * 7) {
    const weeks = input.species === "perro" ? [6, 9, 12, 16] : [8, 12, 16];
    let pendingPast = false;
    weeks.forEach((w, i) => {
      const target = addDays(birth, w * 7);
      const covered = lastVac && lastVac.getTime() >= addDays(target, -10).getTime();
      if (covered) return;
      const isLast = i === weeks.length - 1;
      const label = isLast ? `${vaccineName} + rabia` : vaccineName;
      if (target < today) {
        if (pendingPast) return;
        pendingPast = true;
        items.push({
          date: soon, kind: "vacuna", overdue: true,
          title: `Dosis pendiente de ${label}`,
          sentence: `${n} tiene una dosis atrasada de ${label}: mejor esta semana.`,
        });
      } else {
        const ord = ORDINALS[i] ?? "siguiente";
        items.push({
          date: target, kind: "vacuna", overdue: false,
          title: `${ord[0].toUpperCase() + ord.slice(1)} dosis de ${label}`,
          sentence: `${n} necesita su ${ord} dosis de ${label} en ${monthName(target)}.`,
        });
      }
    });
    const booster = addDays(birth, 365);
    items.push({
      date: booster, kind: "vacuna", overdue: false,
      title: "Primer refuerzo anual",
      sentence: `${n} cumple un año y le toca su primer refuerzo en ${monthName(booster)}.`,
    });
  } else {
    const due = lastVac ? addMonths(lastVac, 12) : null;
    if (!due || due < today) {
      items.push({
        date: soon, kind: "vacuna", overdue: true,
        title: lastVac ? `Refuerzo anual vencido` : "Revisar el esquema de vacunas",
        sentence: lastVac
          ? `${n} tiene el refuerzo vencido desde ${monthName(due!)}: agendemos pronto.`
          : `Sin fecha de la última vacuna, ${n} necesita revisar su carné pronto.`,
      });
      items.push({
        date: addMonths(soon, 12), kind: "vacuna", overdue: false,
        title: "Siguiente refuerzo anual",
        sentence: `Después, el siguiente refuerzo de ${n} sería en ${monthName(addMonths(soon, 12))}.`,
      });
    } else {
      items.push({
        date: due, kind: "vacuna", overdue: false,
        title: `Refuerzo anual: ${vaccineName} y rabia`,
        sentence: `${n} necesita su refuerzo en ${monthName(due)}.`,
      });
    }
  }

  // Deworming
  const intervalAt = (d: Date) => (ageAt(d) < 90 ? 15 : ageAt(d) < 183 ? 30 : 91);
  let next = lastDew ? addDays(lastDew, intervalAt(lastDew)) : null;
  if (!next || next < today) {
    items.push({
      date: soon, kind: "desparasitacion", overdue: true,
      title: lastDew ? "Desparasitación atrasada" : "Desparasitación pendiente",
      sentence: lastDew
        ? `A ${n} ya le tocaba desparasitarse: hagámoslo esta semana.`
        : `Si no recuerdas cuándo fue, ${n} debería desparasitarse ya.`,
    });
    next = addDays(soon, intervalAt(soon));
  }
  let count = 0;
  while (next < horizon && count < 4) {
    items.push({
      date: next, kind: "desparasitacion", overdue: false,
      title: "Desparasitación",
      sentence: `${n} se desparasita otra vez en ${monthName(next)}.`,
    });
    next = addDays(next, intervalAt(next));
    count++;
  }

  // Check-ups
  const years = ageDays / 365.25;
  const senior = years >= 8;
  if (senior) {
    [1, 7].forEach((m) => {
      const d = addMonths(today, m);
      items.push({
        date: d, kind: "chequeo", overdue: false,
        title: "Chequeo senior con laboratorio",
        sentence: `${n} ya es senior: chequeo con exámenes en ${monthName(d)}.`,
      });
    });
  } else if (years >= 1) {
    const d = addMonths(today, 2);
    items.push({
      date: d, kind: "chequeo", overdue: false,
      title: "Chequeo general y revisión dental",
      sentence: `Un chequeo general para ${n} en ${monthName(d)} y quedamos tranquilos.`,
    });
  }

  return items
    .filter((i) => i.date <= horizon)
    .sort((a, b) => a.date.getTime() - b.date.getTime() || (a.overdue ? -1 : 1));
}

// ---------- iCalendar ----------

const pad = (n: number) => String(n).padStart(2, "0");
const icsDate = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

function fold(line: string) {
  // RFC 5545: lines of 75 octets max; continuation lines start with a space.
  const out: string[] = [];
  let cur = "";
  let bytes = 0;
  for (const ch of line) {
    const b = new TextEncoder().encode(ch).length;
    if (bytes + b > 73) {
      out.push(cur);
      cur = " " + ch;
      bytes = 1 + b;
    } else {
      cur += ch;
      bytes += b;
    }
  }
  out.push(cur);
  return out.join("\r\n");
}

export function buildICS(items: PlanItem[], petName: string, now = new Date()) {
  const stamp = now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Arrayan Clinica Veterinaria (demo)//Calendario de tu mascota//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${esc(`Calendario de ${petName}`)}`,
  ];
  items.forEach((it, i) => {
    const end = new Date(it.date.getTime() + DAY);
    lines.push(
      "BEGIN:VEVENT",
      `UID:arrayan-${icsDate(it.date)}-${i}-${Math.random().toString(36).slice(2, 8)}@arrayan-vet-demo.vercel.app`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDate(it.date)}`,
      `DTEND;VALUE=DATE:${icsDate(end)}`,
      `SUMMARY:${esc(`${petName}: ${it.title}`)}`,
      `DESCRIPTION:${esc(`${it.sentence}\nGuía general de la demo de Arrayán Clínica Veterinaria. El veterinario confirma el plan en consulta.`)}`,
      "TRANSP:TRANSPARENT",
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${esc(`Mañana: ${it.title} de ${petName}`)}`,
      "TRIGGER:-PT15H",
      "END:VALARM",
      "END:VEVENT",
    );
  });
  lines.push("END:VCALENDAR");
  return lines.map(fold).join("\r\n") + "\r\n";
}
