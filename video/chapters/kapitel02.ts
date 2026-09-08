import { seconds, type ChapterData } from "../types";

/**
 * Kapitel 02 – Platzhalterinhalt.
 *
 * Alle Texte unterhalb sind Platzhalter des Vorlagenprojekts und beschreiben
 * nur die Vorlage selbst. Für das fertige Kapitel wird ausschließlich diese
 * Datei ersetzt; Layout, Animation und Renderbefehle bleiben unverändert.
 */
export const kapitel02: ChapterData = {
  id: "Kapitel02",
  label: "Kapitel 02",
  title: "Arbeitstitel",
  fps: 30,
  width: 1920,
  height: 1080,
  scenes: [
    {
      type: "title",
      durationInFrames: seconds(5),
      kicker: "Platzhalter",
      title: "Kapitel 02",
      subtitle:
        "Arbeitstitel des Kapitels – Titel und Untertitel werden in video/chapters/kapitel02.ts eingetragen.",
    },
    {
      type: "bullets",
      durationInFrames: seconds(9),
      heading: "So ist dieses Kapitel aufgebaut",
      bullets: [
        "Jede Szene ist ein Eintrag in video/chapters/kapitel02.ts",
        "Vier Szenentypen stehen bereit: title, bullets, statement, outro",
        "Die Dauer steht in Frames – seconds(8) entspricht 8 Sekunden bei 30 fps",
        "Ein weiteres Kapitel entsteht als Kopie dieser Datei",
      ],
    },
    {
      type: "statement",
      durationInFrames: seconds(7),
      text: "Der Text dieser Szenen ist ein Platzhalter. Sobald Ihr Kapitelskript vorliegt, wird nur die Datendatei ersetzt.",
      source: "Hinweis des Vorlagenprojekts",
    },
    {
      type: "outro",
      durationInFrames: seconds(4),
      title: "Ende Kapitel 02",
      note: "Vorschau: npm run studio · Export: npm run render",
    },
  ],
};
