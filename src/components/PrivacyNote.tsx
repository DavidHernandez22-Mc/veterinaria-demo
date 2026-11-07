export const PRIVACY_URL = "https://david-web.castrod2207.workers.dev/privacidad/";

/** Shown beside every form whose data ends up in a WhatsApp message to David. */
export default function PrivacyNote() {
  return (
    <p className="privacy-note">
      Este sitio es una demostración. Si me escribes, tus datos los recibe David Hernández para
      responderte, según su{" "}
      <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
        política de privacidad
      </a>
      .
    </p>
  );
}
