"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { CatHead, DogHead, WhatsAppIcon } from "./Icons";
import { services, waDemo, type Species } from "@/lib/site";

const DAYS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const LONG_DAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const LONG_MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const SLOTS = [
  { id: "manana", label: "Mañana", hint: "7 a 11 a.m." },
  { id: "mediodia", label: "Mediodía", hint: "11 a.m. a 3 p.m." },
  { id: "tarde", label: "Tarde", hint: "3 a 7 p.m." },
];
const STEPS = ["Tu mascota", "El servicio", "Día y franja", "Tus datos"];

const noop = () => () => {};
// Snapshot is a string so it stays stable between renders on the same day.
const dayKey = () => new Date().toDateString();

function nextDays(key: string) {
  if (!key) return [];
  const base = new Date(key);
  const out: Date[] = [];
  for (let i = 1; out.length < 10; i++) {
    const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + i);
    if (d.getDay() !== 0) out.push(d); // Sundays: emergencies only
  }
  return out;
}

const bookable = services.filter((s) => s.id !== "urgencias");

export default function Booking() {
  const key = useSyncExternalStore(noop, dayKey, () => "");
  const days = nextDays(key);
  const [step, setStep] = useState(0);
  const [species, setSpecies] = useState<Species | "">("");
  const [pet, setPet] = useState("");
  const [service, setService] = useState("");
  const [day, setDay] = useState("");
  const [slot, setSlot] = useState("");
  const [owner, setOwner] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  const dayObj = days.find((d) => d.toDateString() === day);
  const serviceObj = services.find((s) => s.id === service);
  const slotObj = SLOTS.find((s) => s.id === slot);

  const checks = [
    () => (!species ? "Cuéntanos si es perro o gato." : !pet.trim() ? "Escribe el nombre de tu mascota." : ""),
    () => (!service ? "Elige un servicio." : ""),
    () => (!day ? "Elige un día." : !slot ? "Elige una franja." : ""),
    () => (!owner.trim() ? "Escribe tu nombre." : ""),
  ];

  function go(to: number) {
    if (to > step) {
      const msg = checks[step]();
      if (msg) {
        setError(msg);
        return;
      }
    }
    setError("");
    setStep(to);
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("[data-focus]")?.focus());
  }

  const message = waDemo([
    "Quiero agendar una cita",
    `• Mascota: ${pet.trim()} (${species})`,
    `• Servicio: ${serviceObj?.name ?? ""}`,
    `• Día: ${dayObj ? `${LONG_DAYS[dayObj.getDay()]} ${dayObj.getDate()} de ${LONG_MONTHS[dayObj.getMonth()]}` : ""}`,
    `• Franja: ${slotObj ? `${slotObj.label} (${slotObj.hint})` : ""}`,
    `• A nombre de: ${owner.trim()}`,
    ...(note.trim() ? [`• Nota: ${note.trim()}`] : []),
  ]);

  return (
    <section id="agenda" className="section" aria-labelledby="agenda-title">
      <div className="wrap">
        <div className="coupon" data-reveal>
          <div className="coupon-stub">
            <h2 id="agenda-title">Agenda en un minuto</h2>
            <p>
              Cuatro pasos cortos y te llega todo ordenado a WhatsApp. Confirmamos la hora exacta en
              menos de una hora, en horario de consulta.
            </p>
          </div>
          <div className="perf" aria-hidden="true" />
          <form
            className="coupon-main"
            onSubmit={(e) => {
              e.preventDefault();
              if (step < 3) go(step + 1);
            }}
            noValidate
          >
            <ol className="steps-bar" aria-hidden="true">
              {STEPS.map((s, i) => (
                <li key={s} data-done={i <= step} />
              ))}
            </ol>
            <div ref={panelRef} key={step} className="step-panel" style={{ display: "grid", gap: "1.1rem" }}>
              <p className="step-title" tabIndex={-1} data-focus>
                {STEPS[step]}
                <span className="sr-only">, paso {step + 1} de 4</span>
              </p>

              {step === 0 && (
                <>
                  <fieldset>
                    <legend className="sr-only">Especie</legend>
                    <div className="choice">
                      {(["perro", "gato"] as const).map((s) => (
                        <label className="chip" key={s}>
                          <input
                            type="radio"
                            name="b-species"
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
                  <label className="field">
                    <span>Nombre de tu mascota</span>
                    <input
                      className="input"
                      value={pet}
                      onChange={(e) => setPet(e.target.value)}
                      placeholder="Ej.: Tango"
                      autoComplete="off"
                      maxLength={24}
                    />
                  </label>
                </>
              )}

              {step === 1 && (
                <fieldset>
                  <legend className="sr-only">Servicio</legend>
                  <div className="service-picks">
                    {bookable.map((s) => (
                      <label className="chip" key={s.id}>
                        <input
                          type="radio"
                          name="b-service"
                          checked={service === s.id}
                          onChange={() => setService(s.id)}
                        />
                        <span>{s.name}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 2 && (
                <>
                  <fieldset>
                    <legend style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
                      Día <small>(domingos solo urgencias)</small>
                    </legend>
                    <div className="day-picks">
                      {days.map((d) => (
                        <label className="chip" key={d.toDateString()}>
                          <input
                            type="radio"
                            name="b-day"
                            checked={day === d.toDateString()}
                            onChange={() => setDay(d.toDateString())}
                            aria-label={`${LONG_DAYS[d.getDay()]} ${d.getDate()} de ${LONG_MONTHS[d.getMonth()]}`}
                          />
                          <span>
                            <small>{DAYS[d.getDay()]}</small>
                            <b>{d.getDate()}</b>
                            <small>{MONTHS[d.getMonth()]}</small>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend style={{ marginBottom: "0.5rem", fontWeight: 600 }}>Franja</legend>
                    <div className="choice">
                      {SLOTS.map((s) => (
                        <label className="chip" key={s.id}>
                          <input
                            type="radio"
                            name="b-slot"
                            checked={slot === s.id}
                            onChange={() => setSlot(s.id)}
                          />
                          <span>
                            {s.label} · {s.hint}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </>
              )}

              {step === 3 && (
                <>
                  <label className="field">
                    <span>Tu nombre</span>
                    <input
                      className="input"
                      value={owner}
                      onChange={(e) => setOwner(e.target.value)}
                      placeholder="Ej.: Carolina"
                      autoComplete="given-name"
                      maxLength={40}
                    />
                  </label>
                  <label className="field">
                    <span>
                      ¿Algo que debamos saber? <small>(opcional)</small>
                    </span>
                    <input
                      className="input"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Ej.: se pone nervioso con otros perros"
                      maxLength={140}
                    />
                  </label>
                  <dl className="summary" aria-label="Resumen de la cita">
                    <div>
                      <dt>Mascota</dt>
                      <dd>
                        {pet.trim()} · {species}
                      </dd>
                    </div>
                    <div>
                      <dt>Servicio</dt>
                      <dd>{serviceObj?.name}</dd>
                    </div>
                    <div>
                      <dt>Cuándo</dt>
                      <dd>
                        {dayObj && `${DAYS[dayObj.getDay()]} ${dayObj.getDate()} ${MONTHS[dayObj.getMonth()]}`} ·{" "}
                        {slotObj?.label}
                      </dd>
                    </div>
                  </dl>
                </>
              )}
            </div>

            <p className="form-error" role="alert">
              {error}
            </p>

            <div className="step-nav">
              {step > 0 ? (
                <button type="button" className="link-btn" onClick={() => go(step - 1)}>
                  Atrás
                </button>
              ) : (
                <span />
              )}
              {step < 3 ? (
                <button type="submit" className="btn btn--big">
                  Siguiente
                </button>
              ) : (
                <a
                  className="btn btn--big"
                  href={message}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    const msg = checks[3]();
                    if (msg) {
                      e.preventDefault();
                      setError(msg);
                    }
                  }}
                >
                  <WhatsAppIcon /> Enviar por WhatsApp
                </a>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
