"use client";

import { useEffect, useState } from "react";
import { Leaf, PawLeaf, WhatsAppIcon } from "./Icons";
import { WA_GENERAL, waLink } from "@/lib/site";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#calendario", label: "Calendario" },
  { href: "#planes", label: "Planes" },
  { href: "#equipo", label: "Equipo" },
  { href: "#agenda", label: "Agendar" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="topbar">
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <div className="demo-strip">
        <div className="wrap">
          <p>
            <span className="demo-long">
              Sitio de demostración diseñado por David · ¿Quieres una así para tu veterinaria?
            </span>
            <span className="demo-short">Demo diseñada por David. ¿Quieres una así?</span>
          </p>
          <a href={waLink(WA_GENERAL)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            Escríbeme
          </a>
        </div>
      </div>
      <header className="site-header on-dark">
        <div className="wrap">
          <a className="brand" href="#inicio" aria-label="Arrayán Clínica Veterinaria, inicio">
            <PawLeaf />
            Arrayán <small>Clínica Veterinaria · Cedritos</small>
          </a>
          <nav className="nav" aria-label="Principal">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <a className="live" href="#urgencias" title="Atendemos urgencias las 24 horas, todos los días">
            <span className="live-dot" aria-hidden="true" />
            <span className="live-label-long">Urgencias abiertas ahora</span>
            <span className="live-label-short">Urgencias 24h</span>
          </a>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
          </button>
        </div>
        {open && (
          <nav id="menu-movil" className="mobile-nav" aria-label="Menú">
            <ul>
              {[{ href: "#urgencias", label: "¿Es una urgencia?" }, ...links].map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)}>
                    <Leaf />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
}
