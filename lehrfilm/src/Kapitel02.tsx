import React from "react";
import { AbsoluteFill, Series, interpolate, useCurrentFrame } from "remotion";
import { GESAMT_FRAMES, farben, sek, szenenSekunden } from "./thema";
import { Szene21, Szene22 } from "./szenen/Szene21_22";
import { Szene23 } from "./szenen/Szene23";
import { Szene24, Szene25, Szene26 } from "./szenen/Szene24_26";

/**
 * Auf- und Abblende ueber dem gesamten Kapitel.
 * Nach Drehbuch: 0,6 s auf, 1,0 s ab, Schwarzblende am Ende,
 * damit sich Einzelclips sauber exportieren lassen.
 */
const Blenden: React.FC = () => {
  const frame = useCurrentFrame();
  const deckkraft = interpolate(
    frame,
    [0, sek(0.6), GESAMT_FRAMES - sek(1), GESAMT_FRAMES],
    [1, 0, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill
      style={{ backgroundColor: "#000000", opacity: deckkraft, pointerEvents: "none" }}
    />
  );
};

export const Kapitel02: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: farben.grund }}>
      {/*
        Tonspur: Sprechertext nach Drehbuch Abschnitt 3 aufnehmen,
        als public/sprecher.mp3 ablegen und die naechsten zwei Zeilen aktivieren.
        import { Audio, staticFile } from "remotion";
        <Audio src={staticFile("sprecher.mp3")} />
      */}
      <Series>
        <Series.Sequence durationInFrames={sek(szenenSekunden.s21_frage)} name="2.1 Die Frage">
          <Szene21 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sek(szenenSekunden.s22_einstieg)} name="2.2 Einstieg">
          <Szene22 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sek(szenenSekunden.s23_kipppunkt)} name="2.3 Kipppunkt">
          <Szene23 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sek(szenenSekunden.s24_kreislauf)} name="2.4 Kreislauf">
          <Szene24 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sek(szenenSekunden.s25_kopf)} name="2.5 Wissen und Belohnung">
          <Szene25 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sek(szenenSekunden.s26_wegzurueck)} name="2.6 Der Weg zurueck">
          <Szene26 />
        </Series.Sequence>
      </Series>
      <Blenden />
    </AbsoluteFill>
  );
};
