"use client";

import { useState } from "react";
import { Leaf, PawLeaf, WhatsAppIcon } from "./Icons";
import { waDemo } from "@/lib/site";

const SIGNS = [
  { id: "respira", label: "Le cuesta respirar", hint: "Respira con la boca abierta, jadea en reposo o tiene encías moradas" },
  { id: "sangra", label: "Sangra mucho", hint: "La herida no para de sangrar después de 5 minutos de presión" },
  { id: "convulsion", label: "Tuvo una convulsión", hint: "Temblores fuertes, rigidez o pérdida del conocimiento" },
  { id: "toxico", label: "Pudo comer algo tóxico", hint: "Veneno, medicamentos humanos, chocolate, uvas, lirios, xilitol" },
  { id: "orina", label: "No puede orinar", hint: "Lo intenta y no sale nada, sobre todo en gatos machos" },
  { id: "golpe", label: "Recibió un golpe fuerte", hint: "Atropello, caída de altura o mordida de otro animal" },
  { id: "abdomen", label: "Tiene el abdomen hinchado", hint: "Duro y crecido, con arcadas que no producen vómito" },
  { id: "vomito", label: "Vomita o tiene diarrea sin parar", hint: "Varias veces en pocas horas, o con sangre" },
  { id: "decaido", label: "No se levanta o no responde", hint: "Muy débil, desorientado o con encías pálidas" },
  { id: "parto", label: "Parto que no avanza", hint: "Puja fuerte por más de 30 minutos sin que nazca la cría" },
];

export default function UrgencyCheck() {
  const [checked, setChecked] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);
  const selected = SIGNS.filter((s) => checked.includes(s.id));
  const state = selected.length > 0 ? "alert" : touched ? "calm" : "idle";

  const toggle = (id: string) => {
    setTouched(true);
    setChecked((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  };

  const waHref = waDemo([
    "URGENCIA (simulada en la demo)",
    "Señales marcadas:",
    ...selected.map((s) => `• ${s.label}`),
    "",
    "Vamos en camino a la clínica.",
  ]);

  return (
    <section id="urgencias" className="section urgent on-dark" aria-labelledby="urg-title">
      <div className="wrap urgent-grid">
        <div>
          <div className="section-head" data-reveal>
            <h2 id="urg-title">¿Es una urgencia?</h2>
            <p className="lead">
              Marca lo que estás viendo. Si algo de esta lista pasa, no esperes a mañana: ven ya,
              estamos despiertos.
            </p>
          </div>
          <fieldset style={{ marginTop: "2rem" }}>
            <legend className="sr-only">Señales de alarma</legend>
            <ul className="signs">
              {SIGNS.map((s, i) => (
                <li key={s.id} data-reveal style={{ ["--i" as string]: i % 4 }}>
                  <label className="sign">
                    <input
                      type="checkbox"
                      checked={checked.includes(s.id)}
                      onChange={() => toggle(s.id)}
                    />
                    <span className="sign-box" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 12 5 5 9-10" />
                      </svg>
                    </span>
                    <span className="sign-text">
                      {s.label}
                      <small>{s.hint}</small>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
          {state === "alert" && (
            <a className="btn btn--alert btn--big btn--block urgent-dock" href={waHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Ven ya · avisar por WhatsApp
            </a>
          )}
          <button
            type="button"
            className="link-btn"
            style={{ marginTop: "0.75rem" }}
            onClick={() => {
              setChecked([]);
              setTouched(true);
            }}
          >
            No veo ninguna de estas señales
          </button>
        </div>

        <div className="verdict" data-state={state} aria-live="polite" data-reveal>
          {state === "alert" && (
            <>
              <PawLeaf className="verdict-mark" />
              <h3>Ven ahora mismo.</h3>
              <p>
                Lo que marcaste puede ser grave y el tiempo cuenta. Sal hacia la clínica y
                escríbenos en el camino para tener todo listo cuando llegues.
              </p>
              <ul>
                {selected.map((s) => (
                  <li key={s.id}>
                    <Leaf /> {s.label}
                  </li>
                ))}
              </ul>
              <a className="btn btn--white btn--big btn--block" href={waHref} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Avisar por WhatsApp que vamos
              </a>
              <p className="disclaimer">
                Mientras llegas: no le des comida, agua ni medicamentos, y transpórtalo quieto y
                abrigado.
              </p>
            </>
          )}
          {state === "calm" && (
            <>
              <PawLeaf className="verdict-mark" />
              <h3>Respira: puede esperar a una cita.</h3>
              <p>
                Sin estas señales, lo mejor es que lo veamos con calma en consulta. Si algo cambia
                o empeora, vuelve a esta lista o ven directo: la puerta está abierta las 24 horas.
              </p>
              <a className="btn btn--forest btn--big btn--block" href="#agenda">
                Agendar una cita
              </a>
            </>
          )}
          {state === "idle" && (
            <>
              <PawLeaf className="verdict-mark" />
              <h3>Aquí te decimos qué hacer.</h3>
              <p>
                Marca una o varias señales, o confirma que no ves ninguna. Te respondemos al
                instante, sin registros ni formularios.
              </p>
            </>
          )}
          <p className="disclaimer">
            Esta lista orienta, no diagnostica. Si tienes dudas, trátalo como urgencia.
          </p>
        </div>
      </div>
    </section>
  );
}
