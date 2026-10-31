"use client";

import { useState, useSyncExternalStore } from "react";
import { CatHead, DogHead, Leaf, ServiceIcon, WhatsAppIcon } from "./Icons";
import { buildICS, buildPlan, formatDate, formatShort, type PlanItem } from "@/lib/schedule";
import { waDemo, type Species } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const SAMPLE = [
  { when: "Ya", year: "esta semana", kind: "desparasitacion", text: "Luna debería desparasitarse ya." },
  { when: "dic", year: "2026", kind: "chequeo", text: "Un chequeo general para Luna en diciembre." },
  { when: "mar", year: "2027", kind: "vacuna", text: "Luna necesita su refuerzo en marzo." },
] as const;

const noop = () => () => {};
const todayISO = () => iso(new Date());

const kindIcon = { vacuna: "syringe", desparasitacion: "pill", chequeo: "stethoscope" } as const;

export default function PetPlanner() {
  const [species, setSpecies] = useState<Species>("perro");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [unit, setUnit] = useState<"meses" | "años">("años");
  const [vac, setVac] = useState("");
  const [vacUnknown, setVacUnknown] = useState(false);
  const [dew, setDew] = useState("");
  const [dewUnknown, setDewUnknown] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [plan, setPlan] = useState<{ items: PlanItem[]; name: string } | null>(null);

  const today = useSyncExternalStore(noop, todayISO, () => "");
  const ageNum = Number(age.replace(",", "."));
  const ageValid = age !== "" && ageNum > 0 && ageNum <= (unit === "meses" ? 36 : 25);
  const nameValid = name.trim().length > 0;
  const vacValid = vacUnknown || (vac !== "" && (!today || vac <= today));
  const dewValid = dewUnknown || (dew !== "" && (!today || dew <= today));
  const valid = ageValid && nameValid && vacValid && dewValid;
  const petName = name.trim().replace(/^\w/u, (c) => c.toUpperCase());

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) {
      setShowErrors(true);
      return;
    }
    setPlan({
      name: petName,
      items: buildPlan({
        species,
        name: petName,
        ageValue: ageNum,
        ageUnit: unit,
        lastVaccine: vacUnknown ? null : vac,
        lastDeworm: dewUnknown ? null : dew,
      }),
    });
    requestAnimationFrame(() =>
      document.getElementById("plan-result")?.focus({ preventScroll: false }),
    );
  }

  function downloadICS() {
    if (!plan) return;
    const blob = new Blob([buildICS(plan.items, plan.name)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `calendario-${plan.name.toLowerCase().normalize("NFD").replace(/[^\w]+/g, "-") || "mascota"}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  const waHref = plan
    ? waDemo([
        `Calendario de ${plan.name} (${species}, ${age} ${unit})`,
        ...plan.items.map(
          (i) => `• ${i.overdue ? "Lo antes posible" : formatDate(i.date)}: ${i.title}`,
        ),
        "",
        "Quiero agendar la primera de estas citas.",
      ])
    : "#";

  const err = (cond: boolean) => showErrors && !cond;

  return (
    <section id="calendario" className="section planner" aria-labelledby="cal-title">
      <div className="wrap planner-grid">
        <form className="planner-form" onSubmit={submit} noValidate>
          <div className="section-head" data-reveal>
            <h2 id="cal-title">Calendario de tu mascota</h2>
            <p className="lead">
              Cuatro datos y te armamos su año: vacunas, desparasitación y chequeos, con fechas.
            </p>
          </div>

          <fieldset className="field" data-reveal>
            <legend>Es un…</legend>
            <div className="choice" style={{ marginTop: "0.4rem" }}>
              {(["perro", "gato"] as const).map((s) => (
                <label className="chip" key={s}>
                  <input
                    type="radio"
                    name="cal-species"
                    value={s}
                    checked={species === s}
                    onChange={() => setSpecies(s)}
                  />
                  <span>
                    {s === "perro" ? <DogHead /> : <CatHead />}
                    {s === "perro" ? "Perro" : "Gato"}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="field" data-reveal>
            <span>¿Cómo se llama?</span>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={species === "perro" ? "Ej.: Luna" : "Ej.: Michi"}
              autoComplete="off"
              maxLength={24}
              aria-invalid={err(nameValid)}
              aria-describedby={err(nameValid) ? "e-name" : undefined}
            />
            {err(nameValid) && <small id="e-name">Escribe su nombre para personalizar el plan.</small>}
          </label>

          <div className="field" data-reveal>
            <span id="age-label">¿Qué edad tiene?</span>
            <div className="row-2">
              <input
                className="input"
                inputMode="decimal"
                value={age}
                onChange={(e) => setAge(e.target.value.replace(/[^\d.,]/g, ""))}
                placeholder={unit === "meses" ? "Ej.: 3" : "Ej.: 4"}
                aria-labelledby="age-label"
                aria-invalid={err(ageValid)}
                aria-describedby={err(ageValid) ? "e-age" : undefined}
              />
              <select
                className="input"
                value={unit}
                onChange={(e) => setUnit(e.target.value as "meses" | "años")}
                aria-label="Unidad de edad"
              >
                <option value="meses">meses</option>
                <option value="años">años</option>
              </select>
            </div>
            {err(ageValid) && (
              <small id="e-age">
                {unit === "meses" ? "Entre 1 y 36 meses." : "Entre 1 y 25 años."}
              </small>
            )}
          </div>

          <div className="row-2 row-2--dates" data-reveal>
            <div className="field">
              <label htmlFor="vac">Última vacuna</label>
              <input
                id="vac"
                className="input"
                type="date"
                max={today || undefined}
                value={vac}
                disabled={vacUnknown}
                onChange={(e) => setVac(e.target.value)}
                aria-invalid={err(vacValid)}
                aria-describedby={err(vacValid) ? "e-vac" : undefined}
              />
              <label className="check-unknown">
                <input type="checkbox" checked={vacUnknown} onChange={(e) => setVacUnknown(e.target.checked)} />
                No sé o nunca
              </label>
              {err(vacValid) && <small id="e-vac">Elige una fecha pasada o marca “No sé”.</small>}
            </div>
            <div className="field">
              <label htmlFor="dew">Última desparasitación</label>
              <input
                id="dew"
                className="input"
                type="date"
                max={today || undefined}
                value={dew}
                disabled={dewUnknown}
                onChange={(e) => setDew(e.target.value)}
                aria-invalid={err(dewValid)}
                aria-describedby={err(dewValid) ? "e-dew" : undefined}
              />
              <label className="check-unknown">
                <input type="checkbox" checked={dewUnknown} onChange={(e) => setDewUnknown(e.target.checked)} />
                No sé o nunca
              </label>
              {err(dewValid) && <small id="e-dew">Elige una fecha pasada o marca “No sé”.</small>}
            </div>
          </div>

          <div data-reveal>
            <button className="btn btn--forest btn--big btn--block" type="submit">
              {plan ? "Actualizar su calendario" : "Ver su calendario"}
            </button>
          </div>
        </form>

        <div
          id="plan-result"
          className="timeline-card"
          tabIndex={-1}
          aria-live="polite"
          aria-labelledby="plan-title"
          data-reveal
        >
          {!plan ? (
            <div className="empty">
              <h3 id="plan-title">Así se verá su año</h3>
              <p>Un ejemplo con Luna, una perrita de 3 años. Llena los datos y aparece el de tu mascota.</p>
              <ol className="timeline timeline--sample" aria-label="Ejemplo de calendario">
                {SAMPLE.map((it) => (
                  <li key={it.when}>
                    <span className="tl-date">
                      {it.when}
                      <small>{it.year}</small>
                    </span>
                    <div className="tl-body" data-kind={it.kind}>
                      <ServiceIcon name={kindIcon[it.kind]} className="tl-mark" />
                      <div>
                        <strong>{it.text}</strong>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <>
              <h3 id="plan-title">El año de {plan.name}</h3>
              <ol className="timeline">
                {plan.items.map((it, i) => (
                  <li key={i}>
                    <span className="tl-date">
                      {it.overdue ? "Ya" : formatShort(it.date)}
                      <small>{it.overdue ? "esta semana" : it.date.getFullYear()}</small>
                    </span>
                    <div className="tl-body" data-kind={it.kind} data-overdue={it.overdue}>
                      <ServiceIcon name={kindIcon[it.kind]} className="tl-mark" />
                      <div>
                        <strong>
                          {it.sentence}
                          {it.overdue && <> <span className="tag">Pendiente</span></>}
                        </strong>
                        <p>{it.title}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="actions">
                <a className="btn btn--forest" href={waHref} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Agendar por WhatsApp
                </a>
                <button className="btn" type="button" onClick={downloadICS}>
                  <ServiceIcon name="calendar" /> Agregar recordatorios a mi calendario
                </button>
              </div>
            </>
          )}
          <p className="guide-note">
            <Leaf />
            <span>
              <b>Es una guía general.</b> Cada mascota es distinta: el veterinario revisa su historia
              y confirma el plan en consulta.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
