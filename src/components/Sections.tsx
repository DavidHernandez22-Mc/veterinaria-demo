import Image from "next/image";
import { Leaf, LEAF_PATH, PawLeaf, ServiceIcon } from "./Icons";
import {
  WA_GENERAL,
  cop,
  faqs,
  photoCredits,
  plans,
  services,
  team,
  testimonials,
  waDemo,
  waLink,
} from "@/lib/site";

/* ---------------- Services ---------------- */
export function Services() {
  return (
    <section id="servicios" className="section services white" aria-labelledby="serv-title">
      <div className="wrap services-grid">
        <div className="services-photo" data-reveal="photo">
          <Image
            src="/photos/consulta-maltes.jpg"
            alt="Veterinaria con estetoscopio junto a un perro maltés feliz"
            fill
            sizes="(min-width: 1100px) 40vw, 86vw"
            quality={70}
          />
        </div>
        <div>
          <div className="section-head" data-reveal>
            <h2 id="serv-title">Todo lo que necesita, bajo un mismo árbol</h2>
            <p className="lead">
              De la primera vacuna a la cirugía, sin mandarlo a otra parte para un examen. Precios
              claros desde el principio.
            </p>
          </div>
          <ul className="service-list">
            {services.map((s, i) => (
              <li
                key={s.id}
                className={`service${s.id === "urgencias" ? " service--urgent" : ""}`}
                data-reveal
                style={{ ["--i" as string]: i % 3 }}
              >
                <div>
                  <h3>
                    <span className="service-icon">
                      <ServiceIcon name={s.icon} />
                    </span>
                    {s.name}
                  </h3>
                  <p>{s.text}</p>
                  <p className="price">
                    Desde {cop(s.from)} {s.unit && <small>· {s.unit}</small>}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="prices-note">
            Precios de referencia en pesos colombianos para esta demo, IVA incluido cuando aplica.
            El valor final depende del peso y del estado de cada paciente, y siempre lo sabes antes.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- First visit: from scattered to calm ---------------- */
function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function leavesDiagram(w: number, h: number, vertical: boolean) {
  const r = rand(vertical ? 41 : 7);
  const out: { x: number; y: number; rot: number; fill: string; s: number }[] = [];
  const N = 46;
  const pale = ["#cfe3b4", "#e0ebd2", "#bcd6a6"];
  const main = vertical ? h : w;
  const cross = vertical ? w : h;
  const place = (a: number, b: number) => (vertical ? { x: b, y: a } : { x: a, y: b });
  // scattered
  for (let i = 0; i < N; i++) {
    const a = r() * main * 0.3 + main * 0.02;
    const b = r() * cross * 0.8 + cross * 0.1;
    out.push({ ...place(a, b), rot: r() * 360, fill: pale[i % 3], s: 0.6 + r() * 0.35 });
  }
  // ribbon
  for (let i = 0; i < N; i++) {
    const a = main * 0.36 + (i / N) * main * 0.28;
    const b = cross / 2 + ((i % 3) - 1) * 16 + (r() - 0.5) * 6;
    out.push({ ...place(a, b), rot: (vertical ? 0 : 45) + (r() - 0.5) * 50, fill: "#7fae6a", s: 0.65 });
  }
  // ordered rows
  const cols = 9;
  const rows = 5;
  for (let i = 0; i < cols * rows; i++) {
    const c = i % cols;
    const rr = Math.floor(i / cols);
    const a = main * 0.7 + (c / (cols - 1)) * main * 0.27;
    const b = cross / 2 + (rr - (rows - 1) / 2) * (cross * 0.16);
    out.push({ ...place(a, b), rot: -45, fill: rr % 2 ? "#2b5a3d" : "#13291c", s: 0.75 });
  }
  return out;
}

function Diagram({ w, h, vertical, className }: { w: number; h: number; vertical?: boolean; className: string }) {
  const leaves = leavesDiagram(w, h, !!vertical);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden="true">
      {leaves.map((l, i) => (
        <path
          key={i}
          d={LEAF_PATH}
          fill={l.fill}
          transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${(l.rot + 45).toFixed(0)}) scale(${l.s}) translate(-12 -12)`}
        />
      ))}
    </svg>
  );
}

const visitSteps = [
  {
    when: "Al llegar",
    title: "Te recibimos",
    text: "Sala de perros a un lado, sala de gatos al otro. Nadie tiene que oler a nadie que no quiera.",
  },
  {
    when: "Minuto 5",
    title: "Nos presentamos",
    text: "Peso, temperatura y un premio. Lo dejamos explorar el consultorio antes de tocarlo.",
  },
  {
    when: "Minutos 10 a 35",
    title: "La revisión",
    text: "De la nariz a la cola, contigo al lado. En el piso si se siente más seguro ahí.",
  },
  {
    when: "Al terminar",
    title: "El plan, por escrito",
    text: "Qué encontramos, qué sigue y cuánto cuesta. Sin sorpresas en la caja.",
  },
  {
    when: "Al día siguiente",
    title: "Te escribimos",
    text: "Un mensaje para saber cómo sigue. Sí, lo leemos todos, incluso los de las 11 p.m.",
  },
];

export function FirstVisit() {
  return (
    <section id="primera-visita" className="section" aria-labelledby="visit-title">
      <div className="wrap">
        <div className="visit-layout">
          <div className="section-head" data-reveal>
            <h2 id="visit-title">Tu primera visita, sin nervios</h2>
            <p className="lead">
              Llega con el corazón a mil y sale moviendo la cola. Así pasa, en orden, para que
              sepas qué esperar (y él también).
            </p>
          </div>
          <div className="visit-photo" data-reveal="photo">
            <Image
              src="/photos/vet-gato.jpg"
              alt="Veterinaria acariciando a un gato atigrado durante la consulta"
              width={1800}
              height={1200}
              sizes="(min-width: 900px) 45vw, 92vw"
              quality={70}
            />
          </div>
        </div>
        <div className="visit-diagram" data-reveal>
          <Diagram w={1200} h={220} className="v-wide" />
          <Diagram w={340} h={520} vertical className="v-tall" />
          <div className="v-caps" aria-hidden="true">
            <span>Llega con nervios</span>
            <span>Lo conocemos sin afán</span>
            <span>Sale moviendo la cola</span>
          </div>
        </div>
        <ol className="visit-steps">
          {visitSteps.map((s, i) => (
            <li key={s.title} data-reveal style={{ ["--i" as string]: i }}>
              <span className="when">{s.when}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Plans ---------------- */
export function Plans() {
  return (
    <section id="planes" className="section white" aria-labelledby="plans-title">
      <div className="wrap plans-wrap">
        <div className="section-head" data-reveal>
          <h2 id="plans-title">Planes de salud que crecen con él</h2>
          <p className="lead">
            Una cuota mensual, todo lo preventivo incluido y cero cuentas sorpresa. Se cancela
            cuando quieras.
          </p>
        </div>
        <div className="plans-grid">
          {plans.map((p, i) => (
            <article
              key={p.id}
              className={`plan plan--${p.id}`}
              data-reveal
              style={{ ["--i" as string]: i }}
              aria-labelledby={`plan-${p.id}`}
            >
              <div className="plan-body">
                <div className="plan-title">
                  <h3 id={`plan-${p.id}`}>{p.name}</h3>
                  {"featured" in p && p.featured && <span className="featured">El más elegido</span>}
                </div>
                <p className="amount">
                  {cop(p.price)} <small>/mes</small>
                </p>
                <p className="who">{p.who}</p>
                <ul>
                  {p.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
              <a
                className="plan-cta"
                href={waDemo([`Me interesa el plan ${p.name} (${cop(p.price)}/mes).`])}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quiero el plan {p.name}
                <span className="arrow" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
      <p className="wrap plans-foot">
        Precios ficticios de demostración. Medicamentos, cirugías y urgencias se cobran aparte con
        los descuentos de cada plan.
      </p>
    </section>
  );
}

/* ---------------- Team ---------------- */
export function Team() {
  return (
    <section id="equipo" className="section" aria-labelledby="team-title">
      <div className="team-panel on-dark">
        <div className="inner">
          <div className="team-head" data-reveal>
            <h2 id="team-title">Cuatro veterinarios y sus jefes en casa</h2>
            <p className="lead">
              Te presentamos al equipo con quien de verdad manda en su vida.
            </p>
          </div>
          <ul className="team-list">
            {team.map((v, i) => (
              <li key={v.name} className="vet" data-reveal style={{ ["--i" as string]: i % 2 }}>
                <div className="vet-photo">
                  <Image src={v.pet.src} alt={v.pet.alt} fill sizes="140px" quality={70} />
                </div>
                <div>
                  <h3>{v.name}</h3>
                  <p className="role">{v.role}</p>
                  <blockquote>
                    <p>“{v.quote}”</p>
                  </blockquote>
                  <p className="pet">En la foto: {v.pet.name}, quien le da órdenes en casa.</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stories ---------------- */
export function Stories() {
  return (
    <section className="section white" aria-labelledby="stories-title">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <h2 id="stories-title">Lo que cuentan en el parque</h2>
        </div>
        <div className="stories">
          {testimonials.map((t) => (
            <div key={t.pet} className="story">
              <div className="story-photo" data-reveal="photo">
                <Image
                  src={t.src}
                  alt={t.alt}
                  width={900}
                  height={1200}
                  sizes="(min-width: 900px) 30vw, 72vw"
                  quality={70}
                />
              </div>
              <figure data-reveal>
                <blockquote>
                  <p>“{t.quote}”</p>
                </blockquote>
                <figcaption>
                  <b>
                    {t.pet} · {t.kind}
                  </b>
                  <span>Lo cuenta {t.owner}</span>
                  <span className="example-tag">
                    <Leaf /> Ejemplo ilustrativo para la demo
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function Faq() {
  return (
    <section id="preguntas" className="section" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="section-head" data-reveal>
          <h2 id="faq-title">Lo que nos preguntan</h2>
          <p>¿No está tu pregunta? Escríbenos, respondemos rápido.</p>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <details key={f.q} name="faq" data-reveal style={{ ["--i" as string]: i % 3 }} open={i === 0}>
              <summary>
                {f.q}
                <span className="plus" aria-hidden="true" />
              </summary>
              <p className="answer">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer id="pie" className="site-footer on-dark">
      <div className="wrap">
        <div className="footer-close">
          <h2>¿Lo vemos esta semana?</h2>
          <div className="footer-actions">
            <a className="btn btn--big" href="#agenda">
              Agendar cita
            </a>
            <a className="btn btn--big btn--alert" href="#urgencias">
              <ServiceIcon name="siren" /> Urgencias 24h
            </a>
          </div>
        </div>
        <div className="footer-mark" aria-hidden="true">
          <PawLeaf />
          <span className="footer-word">Arrayán</span>
        </div>
        <div className="footer-cols">
          <div>
            <h3>Dónde</h3>
            <p>Barrio Cedritos, Bogotá. Cerca al parque, donde los arrayanes dan sombra.</p>
          </div>
          <div>
            <h3>Horario</h3>
            <p>
              Consulta: lunes a sábado, 7 a.m. a 7 p.m.
              <br />
              Urgencias: 24 horas, todos los días.
            </p>
          </div>
          <div>
            <h3>Atajos</h3>
            <ul>
              <li><a href="#servicios">Servicios y precios</a></li>
              <li><a href="#calendario">Calendario de tu mascota</a></li>
              <li><a href="#planes">Planes de salud</a></li>
              <li><a href="#preguntas">Preguntas frecuentes</a></li>
            </ul>
          </div>
          <div>
            <h3>¿Por qué arrayán?</h3>
            <p>
              Es un árbol nativo de la sabana: da sombra, flores blancas y aguanta todo. Queríamos
              parecernos.
            </p>
          </div>
        </div>
        <div className="credits">
          <p>
            Arrayán Clínica Veterinaria es un negocio ficticio. Este es un sitio de demostración
            diseñado por David: nombres, precios, equipo y testimonios son ilustrativos.{" "}
            <a href={waLink(WA_GENERAL)} target="_blank" rel="noopener noreferrer">
              ¿Quieres una web así para tu veterinaria?
            </a>
          </p>
          <p>Fotos de referencia, no corresponden a una clínica real:</p>
          {photoCredits.map((c) => (
            <p key={c}>{c}</p>
          ))}
        </div>
      </div>
    </footer>
  );
}
