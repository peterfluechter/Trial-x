/**
 * Zentrale Gestaltungswerte.
 * HIER die Hausfarben der EFH eintragen - alle Szenen greifen darauf zu,
 * eine Aenderung an dieser Stelle wirkt im gesamten Film.
 */

export const FPS = 30;
export const BREITE = 1920;
export const HOEHE = 1080;

export const farben = {
  grund: "#F4F1EC", // warmer Bildhintergrund
  tinte: "#23303B", // Figur, Linien, Fliesstext
  gedaempft: "#9AA5AD", // Kapitel-Label, Nebeninformation
  akzent: "#C0562F", // Kontrollverlust, Kipppunkt
  hilfslinie: "#E2DDD5", // Grundlinie, Raster
  neutral: "#B9B0A4", // neutrales Symbol fuer das Suchtmittel
} as const;

/**
 * Schrift. Standard ist Poppins ueber @remotion/google-fonts.
 * Soll stattdessen eine lokale Hausschrift verwendet werden:
 * Datei nach public/schrift/ legen, in src/schrift.ts die Zeile
 * mit loadFont ersetzen und dort SCHRIFT auf den Familiennamen setzen.
 */
export const schriftgroessen = {
  gross: 76,
  untertitel: 50,
  label: 30,
  stichwort: 34,
} as const;

/**
 * Szenenlaengen in Sekunden, exakt nach Drehbuch v1.
 * Summe: 210 s = 3:30 Min.
 */
export const szenenSekunden = {
  s21_frage: 25,
  s22_einstieg: 45,
  s23_kipppunkt: 45,
  s24_kreislauf: 40,
  s25_kopf: 30,
  s26_wegzurueck: 25,
} as const;

export const sek = (s: number): number => Math.round(s * FPS);

export const GESAMT_FRAMES = Object.values(szenenSekunden).reduce(
  (summe, s) => summe + sek(s),
  0,
);
