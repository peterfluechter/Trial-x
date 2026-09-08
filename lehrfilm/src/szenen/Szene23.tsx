import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { BREITE, HOEHE, farben, sek } from "../thema";
import { Bildtext, Buehne, Figur } from "../bausteine/Basis";

/**
 * Szene 2.3 - Der Kipppunkt (1:10-1:55)
 * Kernbild des gesamten Films: die ansteigende Linie kippt in der Mitte
 * und wird zu einem Hang, der immer steiler wird.
 * Wird in Kapitel 7 (Rueckfallverhuetung) wieder aufgegriffen.
 */

const X0 = 0.09;
const XK = 0.5;
const X1 = 0.93;
const Y0 = 0.7;
const YK = 0.34;
const Y1 = 0.88;

/** u von 0 bis 1 entlang der gesamten Linie. u = 0.5 ist der Kipppunkt. */
export const punktAuf = (u: number): { x: number; y: number } => {
  if (u <= 0.5) {
    const t = u / 0.5;
    const te = t * t * (3 - 2 * t) * 0.35 + t * 0.65;
    return { x: (X0 + (XK - X0) * te) * BREITE, y: (Y0 + (YK - Y0) * te) * HOEHE };
  }
  const t = (u - 0.5) / 0.5;
  return {
    x: (XK + (X1 - XK) * t) * BREITE,
    y: (YK + (Y1 - YK) * Math.pow(t, 2.2)) * HOEHE,
  };
};

const pfad = (vonU: number, bisU: number): string => {
  const schritte = 120;
  let d = "";
  for (let i = 0; i <= schritte; i++) {
    const u = vonU + ((bisU - vonU) * i) / schritte;
    const p = punktAuf(u);
    d += `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
  }
  return d;
};

export const Szene23: React.FC = () => {
  const frame = useCurrentFrame();

  // Fortschritt entlang der Linie, exakt nach den Timecodes im Drehbuch.
  let u: number;
  if (frame < sek(2)) {
    u = 0;
  } else if (frame < sek(18)) {
    const t = (frame - sek(2)) / sek(16);
    u = 0.5 * (t * t * (3 - 2 * t));
  } else if (frame < sek(24)) {
    u = 0.5;
  } else if (frame < sek(38)) {
    u = 0.5 + 0.5 * Math.pow((frame - sek(24)) / sek(14), 1.9);
  } else {
    u = 1;
  }

  const p = punktAuf(Math.min(u, 1));
  const vorher = punktAuf(Math.max(0.002, Math.min(u, 1) - 0.002));
  const steigung = (Math.atan2(p.y - vorher.y, p.x - vorher.x) * 180) / Math.PI;

  const rutscht = frame >= sek(23);
  const k = interpolate(frame, [sek(23), sek(27)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const neigung = rutscht
    ? steigung * 0.3 * (1 - k) + Math.min(steigung, 52) * 0.85 * k
    : steigung * 0.3;

  const markeAuf = interpolate(frame, [sek(22), sek(23.5)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const kipp = punktAuf(0.5);

  return (
    <>
      <Buehne>
        <path
          d={pfad(0, Math.min(u, 0.5))}
          fill="none"
          stroke={farben.tinte}
          strokeWidth={13}
          strokeLinecap="round"
        />
        {u > 0.5 ? (
          <path
            d={pfad(0.5, u)}
            fill="none"
            stroke={farben.akzent}
            strokeWidth={13}
            strokeLinecap="round"
          />
        ) : null}
        <circle
          cx={kipp.x}
          cy={kipp.y}
          r={16}
          fill="none"
          stroke={farben.akzent}
          strokeWidth={5}
          opacity={markeAuf}
        />
        <Figur
          x={p.x}
          y={p.y - 3}
          neigung={neigung}
          gehphase={rutscht && k > 0.5 ? null : (frame / 30) * 5.2}
        />
      </Buehne>
      <Bildtext text="Anfangs entscheiden Sie." ab={5} dauer={9} />
      <Bildtext text="Später entscheidet es sich ohne Sie." ab={19} dauer={10} />
      <Bildtext text="Es läuft von selbst." ab={33} dauer={10} gross farbe={farben.akzent} />
    </>
  );
};
