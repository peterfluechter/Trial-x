/**
 * Datenmodell für Kapitelvideos.
 *
 * Inhalt und Darstellung sind bewusst getrennt: Ein neues Kapitel entsteht
 * durch eine neue Datendatei in video/chapters/ – der Code in video/scenes/
 * und video/components/ bleibt unverändert.
 */

/** Vorspann einer Szene bzw. des Kapitels. */
export type TitleScene = {
  type: "title";
  durationInFrames: number;
  /** Kleine Zeile über dem Titel, z. B. "Kapitel 02". */
  kicker?: string;
  title: string;
  subtitle?: string;
};

/** Überschrift mit nacheinander eingeblendeter Aufzählung. */
export type BulletsScene = {
  type: "bullets";
  durationInFrames: number;
  heading: string;
  bullets: string[];
};

/** Einzelne Kernaussage, großflächig gesetzt. */
export type StatementScene = {
  type: "statement";
  durationInFrames: number;
  text: string;
  /** Optionale Quellen- oder Sprecherangabe unter der Aussage. */
  source?: string;
};

/** Abspann des Kapitels. */
export type OutroScene = {
  type: "outro";
  durationInFrames: number;
  title: string;
  note?: string;
};

export type Scene = TitleScene | BulletsScene | StatementScene | OutroScene;

export type ChapterData = {
  /** Zugleich Name der Composition und Dateiname beim Export, z. B. "Kapitel02". */
  id: string;
  /** Anzeigename im Bild, z. B. "Kapitel 02". */
  label: string;
  /** Kapiteltitel für die Kopfzeile. */
  title: string;
  fps: number;
  width: number;
  height: number;
  scenes: Scene[];
};

/** Gesamtlänge eines Kapitels in Frames (Summe aller Szenen). */
export const totalDurationInFrames = (chapter: ChapterData): number =>
  chapter.scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0);

/** Sekunden in Frames umrechnen – für lesbare Datendateien. */
export const seconds = (value: number, fps = 30): number => Math.round(value * fps);
