export const SITE_URL = "https://arrayan-vet-demo.vercel.app";
export const WA_NUMBER = "573008564773";
export const WA_GENERAL =
  "Hola David, vi tu demo de la veterinaria y me interesa una web así para mi negocio.";
export const WA_DEMO_PREFIX = "Hola David, probé tu demo de la veterinaria:";

export function waLink(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function waDemo(lines: string[]) {
  return waLink([WA_DEMO_PREFIX, "", ...lines].join("\n"));
}

export const cop = (n: number) =>
  "$" + n.toLocaleString("es-CO", { maximumFractionDigits: 0 });

export type Species = "perro" | "gato";

export type IconName =
  | "stethoscope"
  | "syringe"
  | "pill"
  | "scalpel"
  | "microscope"
  | "xray"
  | "tooth"
  | "scissors"
  | "siren"
  | "calendar";

export const services: {
  id: string;
  name: string;
  icon: IconName;
  from: number;
  unit?: string;
  text: string;
}[] = [
  {
    id: "consulta",
    name: "Consulta general",
    icon: "stethoscope",
    from: 75000,
    text: "Media hora sin afán: lo revisamos de la nariz a la cola y le explicamos todo en palabras normales.",
  },
  {
    id: "vacunacion",
    name: "Vacunación",
    icon: "syringe",
    from: 65000,
    unit: "por vacuna",
    text: "Esquemas para cachorros, gatitos y adultos. El carné queda al día y el pinchazo, con premio.",
  },
  {
    id: "desparasitacion",
    name: "Desparasitación",
    icon: "pill",
    from: 35000,
    text: "Interna y externa, con la dosis exacta para su peso. Nada de adivinar con la pastilla del vecino.",
  },
  {
    id: "cirugia",
    name: "Cirugía",
    icon: "scalpel",
    from: 380000,
    unit: "esterilización",
    text: "Quirófano con monitoreo de anestesia y una persona dedicada solo a su recuperación.",
  },
  {
    id: "laboratorio",
    name: "Laboratorio",
    icon: "microscope",
    from: 70000,
    unit: "cuadro hemático",
    text: "Sangre, orina y coprológicos en la clínica. La mayoría de resultados, el mismo día.",
  },
  {
    id: "imagenes",
    name: "Imágenes diagnósticas",
    icon: "xray",
    from: 120000,
    unit: "rayos X",
    text: "Rayos X digitales y ecografía. Le mostramos la pantalla y le contamos qué estamos viendo.",
  },
  {
    id: "odontologia",
    name: "Odontología veterinaria",
    icon: "tooth",
    from: 320000,
    unit: "profilaxis",
    text: "Limpieza con ultrasonido y revisión de cada diente. Ese mal aliento casi nunca es normal.",
  },
  {
    id: "peluqueria",
    name: "Peluquería",
    icon: "scissors",
    from: 55000,
    unit: "baño, gato o perro pequeño",
    text: "Baño, corte y uñas sin prisas. Los gatos tienen su propio horario, lejos de los ladridos.",
  },
  {
    id: "urgencias",
    name: "Urgencias 24 horas",
    icon: "siren",
    from: 130000,
    unit: "valoración",
    text: "Veterinario de turno toda la noche, también domingos y festivos. Llegue directo, sin cita.",
  },
];

export const plans = [
  {
    id: "cachorro",
    name: "Cachorro",
    who: "De 2 a 12 meses",
    price: 84900,
    items: [
      "Esquema completo de vacunas",
      "Desparasitación mensual",
      "Consulta de control cada mes",
      "Charla de crianza y alimentación",
    ],
  },
  {
    id: "adulto",
    name: "Adulto",
    who: "De 1 a 7 años",
    price: 64900,
    featured: true,
    items: [
      "Refuerzos anuales de vacunas",
      "Desparasitación cada 3 meses",
      "2 consultas generales al año",
      "15 % menos en peluquería",
      "Cuadro hemático anual",
    ],
  },
  {
    id: "senior",
    name: "Senior",
    who: "Desde los 8 años",
    price: 109900,
    items: [
      "Chequeo con laboratorio cada 6 meses",
      "Refuerzos y desparasitación",
      "Revisión dental anual",
      "Control de dolor y articulaciones",
      "Ecografía abdominal anual",
      "20 % menos en urgencias",
    ],
  },
] as const;

export const team = [
  {
    name: "Dra. Mariana Restrepo",
    role: "Medicina interna y directora médica",
    quote:
      "Lo que más me gusta es el día en que el paciente nervioso entra moviendo la cola.",
    pet: { src: "/photos/jack-rosa.jpg", alt: "Perro jack russell de orejas dobladas sobre fondo rosado", name: "Tornillo" },
  },
  {
    name: "Dr. Andrés Gaitán",
    role: "Cirugía de tejidos blandos",
    quote: "Opero con música clásica. Los pacientes no opinan; el equipo sí.",
    pet: { src: "/photos/gato-escalera.jpg", alt: "Gato atigrado sentado en una escalera blanca", name: "Ñoño" },
  },
  {
    name: "Dra. Laura Pinzón",
    role: "Medicina felina",
    quote: "Un gato no es un perro pequeño. Aquí tienen su sala, su horario y su paciencia.",
    pet: { src: "/photos/gato-manta.jpg", alt: "Gato asomado debajo de una manta", name: "Arepa" },
  },
  {
    name: "Dr. Felipe Ocampo",
    role: "Urgencias y cuidados intensivos",
    quote: "De noche la clínica es otra. Lo bonito es que nadie llega solo.",
    pet: { src: "/photos/samoyedo.jpg", alt: "Perro samoyedo blanco sonriendo sobre fondo rosado", name: "Nube" },
  },
];

export const testimonials = [
  {
    pet: "Kira",
    kind: "Pastora australiana, 3 años",
    owner: "Camila, su humana",
    quote:
      "Kira se comió la mitad de una media un domingo a las once de la noche. Nos recibieron con toda la calma del mundo y a la una ya estábamos en casa. Sin la media.",
    src: "/photos/aussie.jpg",
    alt: "Perra pastora australiana corriendo en la playa",
  },
  {
    pet: "Mostaza",
    kind: "Gato naranja, 6 años",
    owner: "Julián, su roommate",
    quote:
      "Mostaza odia salir de la casa. Aquí lo atendieron en la sala de gatos, sin perros a la vista, y por primera vez volvió del veterinario sin hablarme mal.",
    src: "/photos/gato-naranja.jpg",
    alt: "Gato naranja de pelo largo mirando hacia arriba",
  },
  {
    pet: "Pancho",
    kind: "Jack russell, 9 años",
    owner: "Doña Teresa, su vecina de siempre",
    quote:
      "Me explicaron los exámenes de Pancho con dibujos y todo. Ahora va cada seis meses y llega jalando la correa, el sinvergüenza.",
    src: "/photos/jack-calle.jpg",
    alt: "Perro blanco con manchas negras sonriendo en una acera",
  },
];

export const faqs = [
  {
    q: "¿Cuál es el horario?",
    a: "Consulta, peluquería y laboratorio: lunes a sábado de 7:00 a.m. a 7:00 p.m. Urgencias: las 24 horas, todos los días, incluidos domingos y festivos.",
  },
  {
    q: "¿Cómo funcionan las urgencias?",
    a: "No necesita cita. Al llegar, el veterinario de turno hace una valoración inicial y prioriza según la gravedad, no según el orden de llegada. Si nos escribe por WhatsApp en camino, alistamos todo antes de que entre.",
  },
  {
    q: "¿Qué medios de pago reciben?",
    a: "Efectivo, tarjetas débito y crédito, transferencia y pagos por QR. Para cirugías programadas le damos el presupuesto por escrito antes del procedimiento.",
  },
  {
    q: "¿Atienden animales exóticos?",
    a: "No. Somos especialistas en perros y gatos, y preferimos hacer muy bien eso. Si tiene un conejo, un ave o un reptil, con gusto le recomendamos colegas que sí los atienden.",
  },
  {
    q: "¿Qué llevo a la primera consulta?",
    a: "El carné de vacunas si lo tiene, exámenes o fórmulas anteriores, y una lista de lo que le preocupa. Los perros, con correa; los gatos, en guacal cerrado con una toalla que huela a casa.",
  },
  {
    q: "¿Cada cuánto debo vacunar?",
    a: "Cachorros y gatitos reciben varias dosis entre las 6 y las 16 semanas. Después, un refuerzo al año. El plan exacto depende de su edad, su historia y su estilo de vida, y lo definimos en consulta.",
  },
  {
    q: "¿Puedo quedarme con mi mascota durante la consulta?",
    a: "Siempre, y lo preferimos: su voz la tranquiliza más que cualquier premio. Solo en cirugía y algunos procedimientos le pedimos esperar afuera, y le vamos contando por WhatsApp.",
  },
];

export const photoCredits = [
  "Perros y gatos: fotografías de Unsplash (licencia Unsplash).",
  "Veterinaria con perro maltés: “Dog portrait with a veterinarian in blue uniform holding a stethoscope”, de Nenad Stojkovic, CC BY 2.0, vía Wikimedia Commons.",
];
