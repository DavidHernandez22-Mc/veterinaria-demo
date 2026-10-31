import type { IconName } from "@/lib/site";

type P = { className?: string; title?: string };

/** The arrayán leaf: pointed at two opposite corners, like the page's buttons and photo masks. */
export const LEAF_PATH = "M2 22C2 10.5 10.5 2 22 2C22 13.5 13.5 22 2 22Z";

export function Leaf({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d={LEAF_PATH} fill="currentColor" />
    </svg>
  );
}

/** The mark: a paw whose four toes and pad are arrayán leaves. */
export function PawLeaf({ className, title }: P) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <g fill="currentColor">
        <path d={LEAF_PATH} transform="translate(32 47) rotate(45) scale(1.3) translate(-12 -12)" />
        <path d={LEAF_PATH} transform="translate(13.3 32.3) rotate(-103) scale(0.62) translate(-12 -12)" />
        <path d={LEAF_PATH} transform="translate(24.3 20.2) rotate(-63) scale(0.62) translate(-12 -12)" />
        <path d={LEAF_PATH} transform="translate(39.7 20.2) rotate(-27) scale(0.62) translate(-12 -12)" />
        <path d={LEAF_PATH} transform="translate(50.7 32.3) rotate(13) scale(0.62) translate(-12 -12)" />
      </g>
    </svg>
  );
}

export function DogHead({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 9C6 7 3 9 3 13c0 3 2 5 4 5" />
        <path d="M23 9c3-2 6 0 6 4 0 3-2 5-4 5" />
        <path d="M9 9c2-2 4.5-3 7-3s5 1 7 3c1.5 2 2 4.5 2 7 0 6-4 10-9 10S7 22 7 16c0-2.5.5-5 2-7Z" />
        <path d="M14 21h4l-2 2-2-2Z" fill="currentColor" />
      </g>
      <circle cx="12.5" cy="15" r="1.4" fill="currentColor" />
      <circle cx="19.5" cy="15" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function CatHead({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 5l5 5c1.6-.6 3.2-1 5-1s3.4.4 5 1l5-5 1 10c0 7-5 12-11 12S5 22 5 15L6 5Z" />
        <path d="M14.5 20h3l-1.5 1.5L14.5 20Z" fill="currentColor" />
        <path d="M2 18l6 .5M2.5 22l5.5-1.5M30 18l-6 .5M29.5 22 24 20.5" />
      </g>
      <circle cx="12" cy="16" r="1.4" fill="currentColor" />
      <circle cx="20" cy="16" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.76-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"
      />
    </svg>
  );
}

const paths: Record<IconName, React.ReactNode> = {
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4M8 14h3M8 17h6" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M6 3v6a5 5 0 0 0 10 0V3" />
      <path d="M11 14v2a5 5 0 0 0 10 0v-2" />
      <circle cx="21" cy="12" r="2" />
    </>
  ),
  syringe: (
    <>
      <path d="m18 2 4 4M16 4l4 4M19 5l-11 11M14 5l5 5M5 19l-3 3M10 9l2 2M7 12l2 2" />
      <path d="M8 16l-3 3" />
    </>
  ),
  pill: (
    <>
      <rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-45 12 12)" />
      <path d="m9.5 9.5 5 5" />
    </>
  ),
  scalpel: (
    <>
      <path d="M3 21 14 10" />
      <path d="M14 10c2-4 5-6 7-7-1 3-3 6-7 7Z" />
    </>
  ),
  microscope: (
    <>
      <path d="M6 21h12M9 17h6M12 17v4" />
      <path d="M10 4l4 2-3 6-4-2 3-6Z" />
      <path d="M14 10a5 5 0 0 1 1 8" />
    </>
  ),
  xray: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 6v12M8 9h8M7.5 12h9M8 15h8" />
    </>
  ),
  tooth: (
    <path d="M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 4.5 2 7 .5 3 1 6.5 3 6.5s2-4.5 4-4.5 2 4.5 4 4.5 2.5-3.5 3-6.5c.5-2.5 2-4 2-7C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3Z" />
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12" />
    </>
  ),
  siren: (
    <>
      <path d="M7 18v-6a5 5 0 0 1 10 0v6" />
      <path d="M5 21h14v-3H5v3ZM12 2v2M4 6l1.5 1.5M20 6l-1.5 1.5" />
    </>
  ),
};

export function ServiceIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
