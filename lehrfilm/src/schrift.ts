import { loadFont } from "@remotion/google-fonts/Poppins";

const { fontFamily } = loadFont();

/**
 * Einziger Ort, an dem die Schrift bestimmt wird.
 * Fuer eine lokale Hausschrift: obigen Import entfernen und hier
 * SCHRIFT = '"Name der Hausschrift", sans-serif' setzen, die Schriftdatei
 * per @font-face in src/stil.css einbinden.
 */
export const SCHRIFT = `${fontFamily}, "Helvetica Neue", Arial, sans-serif`;
