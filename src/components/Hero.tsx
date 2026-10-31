"use client";

import Image from "next/image";
import { useState } from "react";
import { CatHead, DogHead, Leaf, ServiceIcon } from "./Icons";
import type { Species } from "@/lib/site";

const copy: Record<
  Species,
  { title: string; sub: string; note: string; alt: string; detail: string }
> = {
  perro: {
    title: "Aquí entra moviendo la cola",
    sub: "Clínica veterinaria en Cedritos. Lo revisamos con calma, te explicamos todo sin enredos y le damos premio aunque no se lo haya ganado.",
    note: "Sala de espera con agua fresca y galletas de hígado",
    alt: "Beagle sonriente con la lengua afuera sobre un fondo verde",
    detail: "Paseo corto antes de la consulta: llega más tranquilo",
  },
  gato: {
    title: "Aquí hasta los gatos ronronean",
    sub: "Clínica veterinaria en Cedritos con sala solo para gatos, sin ladridos ni afán. Ella decide cuándo salir del guacal.",
    note: "Consultorio felino con feromonas y cero perros a la vista",
    alt: "Gato blanco y negro asomado sobre una mesa con fondo verde",
    detail: "Trae su cobija: el olor a casa la calma",
  },
};

export default function Hero() {
  const [species, setSpecies] = useState<Species>("perro");
  // Animate only after the visitor switches, so the first paint is immediate.
  const [touched, setTouched] = useState(false);
  const c = copy[species];
  const swap = touched ? " swap" : "";
  const pick = (s: Species) => {
    setTouched(true);
    setSpecies(s);
  };

  return (
    <section id="inicio" className="hero on-dark" data-species={species} aria-labelledby="hero-title">
      <div className="hero-leaf" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="species" role="group" aria-label="¿Perro o gato?">
          <span className="species-q" aria-hidden="true">
            ¿Perro o gato?
          </span>
          <button type="button" aria-pressed={species === "perro"} onClick={() => pick("perro")}>
            <DogHead /> Perro
          </button>
          <button type="button" aria-pressed={species === "gato"} onClick={() => pick("gato")}>
            <CatHead /> Gato
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          {species === "perro" ? "Mostrando la versión para perros" : "Mostrando la versión para gatos"}
        </p>

        <h1 id="hero-title">
          <span key={species} className={swap.trim() || undefined}>
            {c.title}
          </span>
        </h1>

        <p key={`sub-${species}`} className={`hero-sub lead${swap}`}>
          {c.sub}
        </p>

        <div className="hero-actions">
          <a className="btn btn--big" href="#agenda">
            Agendar cita
          </a>
          <a className="btn btn--big btn--alert" href="#urgencias">
            <ServiceIcon name="siren" className="hide-xs" />
            Urgencias 24h
          </a>
        </div>

        <p key={`d-${species}`} className={`hero-detail${swap}`}>
          <Leaf /> {c.detail}
        </p>

        <div className="hero-photo-wrap">
          <div className="hero-photo">
            <Image
              src="/photos/hero-perro.jpg"
              alt={copy.perro.alt}
              fill
              sizes="(min-width: 1000px) 46vw, 88vw"
              preload
              quality={70}
              data-active={species === "perro"}
              aria-hidden={species !== "perro"}
            />
            <Image
              src="/photos/hero-gato.jpg"
              alt={copy.gato.alt}
              fill
              sizes="(min-width: 1000px) 46vw, 88vw"
              quality={70}
              data-active={species === "gato"}
              aria-hidden={species !== "gato"}
            />
          </div>
          <p key={`n-${species}`} className={`hero-note${swap}`}>
            {species === "perro" ? <DogHead /> : <CatHead />}
            {c.note}
          </p>
        </div>
      </div>
      <ul className="wrap hero-strip" aria-label="Lo esencial">
        <li>
          <Leaf /> Cedritos, Bogotá
        </li>
        <li>
          <Leaf /> Consulta lunes a sábado, 7 a.m. a 7 p.m.
        </li>
        <li>
          <Leaf /> Urgencias 24 horas, también festivos
        </li>
        <li>
          <Leaf /> Solo perros y gatos
        </li>
      </ul>
    </section>
  );
}
