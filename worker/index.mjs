// La demo es 100 % estática: este Worker solo existe para que la dirección de workers.dev
// (y http://) lleve con 301 al dominio propio, con la misma ruta y parámetros.
// Todo lo demás se entrega tal cual desde los archivos (con _headers y 404.html).
import { CANONICAL_HOST, WORKERS_DEV_HOST } from "./hosts.mjs";

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === WORKERS_DEV_HOST || (url.hostname === CANONICAL_HOST && url.protocol === "http:")) {
      return Response.redirect(`https://${CANONICAL_HOST}${url.pathname}${url.search}`, 301);
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
