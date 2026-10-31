"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./Icons";
import { WA_GENERAL, waLink } from "@/lib/site";

/** Hides itself over the hero, the forms and the footer so it never covers their own actions. */
export default function WaFloat() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const targets = ["inicio", "urgencias", "calendario", "agenda", "pie"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setHidden(visible.size > 0);
      },
      { rootMargin: "0px 0px -35% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <a
      className="wa-float"
      href={waLink(WA_GENERAL)}
      target="_blank"
      rel="noopener noreferrer"
      data-hidden={hidden}
      aria-label="Escribir por WhatsApp"
      tabIndex={hidden ? -1 : undefined}
    >
      <WhatsAppIcon />
      <span className="wa-label">¿Hablamos?</span>
    </a>
  );
}
