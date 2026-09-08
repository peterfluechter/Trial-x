import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BREITE, HOEHE, farben, schriftgroessen, sek } from "../thema";
import { SCHRIFT } from "../schrift";

/**
 * Bildrahmen fuer jede Szene: Hintergrund, Grundlinie, Kapitel-Label.
 * Alle Szenen zeichnen ihren Inhalt als SVG in den Koordinatenraum
 * 1920 x 1080, damit Positionen zwischen den Szenen vergleichbar bleiben.
 */
export const Buehne: React.FC<{
  children: React.ReactNode;
  grundlinie?: boolean;
}> = ({ children, grundlinie = true }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: farben.grund }}>
      <svg
        width={BREITE}
        height={HOEHE}
        viewBox={`0 0 ${BREITE} ${HOEHE}`}
        style={{ position: "absolute" }}
      >
        {grundlinie ? (
          <line
            x1={0.05 * BREITE}
            y1={0.9 * HOEHE}
            x2={0.95 * BREITE}
            y2={0.9 * HOEHE}
            stroke={farben.hilfslinie}
            strokeWidth={3}
          />
        ) : null}
        {children}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 0.05 * BREITE,
          top: 0.94 * HOEHE,
          fontFamily: SCHRIFT,
          fontSize: schriftgroessen.label,
          color: farben.gedaempft,
        }}
      >
        Kapitel 2 · Der Weg in die Sucht
      </div>
    </AbsoluteFill>
  );
};

/**
 * Bildtext am oberen Rand. Zeiten in Sekunden, relativ zum Szenenbeginn.
 */
export const Bildtext: React.FC<{
  text: string;
  ab: number;
  dauer: number;
  gross?: boolean;
  farbe?: string;
}> = ({ text, ab, dauer, gross = false, farbe = farben.tinte }) => {
  const frame = useCurrentFrame();
  const start = sek(ab);
  const ende = sek(ab + dauer);
  const deckkraft = interpolate(
    frame,
    [start, start + sek(0.6), ende - sek(0.6), ende],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  if (deckkraft <= 0.01) {
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        top: 0.07 * HOEHE,
        textAlign: "center",
        fontFamily: SCHRIFT,
        fontWeight: gross ? 700 : 500,
        fontSize: gross ? schriftgroessen.gross : schriftgroessen.untertitel,
        color: farbe,
        opacity: deckkraft,
      }}
    >
      {text}
    </div>
  );
};

/**
 * Figur aus Kopf, Rumpf, Armen, Beinen.
 * neigung in Grad, Drehpunkt ist der Fusspunkt (x, y).
 * gehphase = null bedeutet gestreckte Glieder (rutschend, stehend).
 */
export const Figur: React.FC<{
  x: number;
  y: number;
  neigung?: number;
  gehphase?: number | null;
  groesse?: number;
}> = ({ x, y, neigung = 0, gehphase = null, groesse = 1 }) => {
  const s = groesse;

  let armLinks = 0.9;
  let armRechts = -0.3;
  let beinLinks = 0.5;
  let beinRechts = 0.15;

  if (gehphase !== null) {
    const schwung = Math.sin(gehphase);
    armLinks = 0.5 + schwung * 0.45;
    armRechts = 0.5 - schwung * 0.45;
    beinLinks = schwung * 0.45;
    beinRechts = -schwung * 0.45;
  }

  return (
    <g transform={`translate(${x} ${y}) rotate(${neigung})`}>
      <circle cx={0} cy={-122 * s} r={30 * s} fill={farben.tinte} />
      <line
        x1={0}
        y1={-92 * s}
        x2={0}
        y2={-42 * s}
        stroke={farben.tinte}
        strokeWidth={20 * s}
        strokeLinecap="round"
      />
      {[armLinks, armRechts].map((a, i) => (
        <line
          key={`arm-${i}`}
          x1={0}
          y1={-84 * s}
          x2={a * 42 * s}
          y2={-46 * s}
          stroke={farben.tinte}
          strokeWidth={14 * s}
          strokeLinecap="round"
        />
      ))}
      {[beinLinks, beinRechts].map((b, i) => (
        <line
          key={`bein-${i}`}
          x1={0}
          y1={-42 * s}
          x2={b * 46 * s}
          y2={0}
          stroke={farben.tinte}
          strokeWidth={16 * s}
          strokeLinecap="round"
        />
      ))}
    </g>
  );
};

/**
 * Neutrales Symbol fuer das Suchtmittel.
 * Bewusst abstrakt: im gesamten Film wird kein Konsumgegenstand gezeigt.
 */
export const NeutralesSymbol: React.FC<{
  x: number;
  y: number;
  r?: number;
  deckkraft?: number;
}> = ({ x, y, r = 26, deckkraft = 1 }) => (
  <circle cx={x} cy={y} r={r} fill={farben.neutral} opacity={deckkraft} />
);
