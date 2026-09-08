import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BREITE, HOEHE, farben, schriftgroessen, sek } from "../thema";
import { SCHRIFT } from "../schrift";
import { Bildtext, Buehne, NeutralesSymbol } from "../bausteine/Basis";

const kasten = (
  x: number,
  y: number,
  b: number,
  h: number,
  text: string,
  deckkraft: number,
  key: string,
): React.ReactElement => (
  <g key={key} opacity={deckkraft}>
    <rect
      x={x - b / 2}
      y={y - h / 2}
      width={b}
      height={h}
      rx={16}
      fill="none"
      stroke={farben.tinte}
      strokeWidth={4}
    />
    <text
      x={x}
      y={y + 12}
      textAnchor="middle"
      fontFamily={SCHRIFT}
      fontSize={schriftgroessen.stichwort}
      fill={farben.tinte}
    >
      {text}
    </text>
  </g>
);

/**
 * Szene 2.4 - Der Kreis, der sich selbst antreibt (1:55-2:35)
 * Teufelskreis nach Kuefner (1981), in eigener Darstellung.
 * Der Kreis wird schneller und groesser, je laenger er laeuft.
 */
export const Szene24: React.FC = () => {
  const frame = useCurrentFrame();
  const mx = BREITE / 2;
  const my = 0.55 * HOEHE;

  const wachstum = interpolate(frame, [sek(6), sek(34)], [1, 1.22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const r = 210 * wachstum;

  // Umlaufgeschwindigkeit steigt an: der Kreis treibt sich selbst.
  const tempo = interpolate(frame, [sek(6), sek(34)], [0.55, 2.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const winkel = ((frame / 30) * tempo * Math.PI) / 1.2 - Math.PI / 2;
  const px = mx + Math.cos(winkel) * r;
  const py = my + Math.sin(winkel) * r;

  const obenAuf = interpolate(frame, [sek(2), sek(4)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const untenAuf = interpolate(frame, [sek(8), sek(10)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <Buehne grundlinie={false}>
        <circle
          cx={mx}
          cy={my}
          r={r}
          fill="none"
          stroke={farben.hilfslinie}
          strokeWidth={6}
        />
        <circle cx={px} cy={py} r={17} fill={farben.akzent} opacity={untenAuf} />
        {kasten(mx, my - r, 470, 92, "Kurze Erleichterung", obenAuf, "oben")}
        {kasten(mx - 330, my + r - 20, 300, 86, "Körper", untenAuf, "u1")}
        {kasten(mx, my + r + 90, 320, 86, "Stimmung", untenAuf, "u2")}
        {kasten(mx + 340, my + r - 20, 420, 86, "Familie und Geld", untenAuf, "u3")}
        <NeutralesSymbol x={mx} y={my} r={30} deckkraft={0.55 * untenAuf} />
      </Buehne>
      <Bildtext text="Dabei entsteht ein Kreislauf." ab={2} dauer={8} />
      <Bildtext text="Mit jeder Runde wird er größer." ab={26} dauer={11} />
    </>
  );
};

/**
 * Szene 2.5 - Warum Vernunft allein nicht reicht (2:35-3:05)
 * Bewusst vereinfachtes Schema, kein anatomisches Modell.
 * Der Pfeil von "Wissen" nach "Belohnung" wird auf halbem Weg duenn.
 */
export const Szene25: React.FC = () => {
  const frame = useCurrentFrame();
  const mx = BREITE / 2;
  const my = 0.52 * HOEHE;

  const kopfAuf = interpolate(frame, [sek(1), sek(3)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pfeilAuf = interpolate(frame, [sek(8), sek(11)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lernen = interpolate(frame, [sek(20), sek(26)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const segmente = 26;

  return (
    <>
      <Buehne grundlinie={false}>
        <g opacity={kopfAuf}>
          <path
            d={`M ${mx - 210} ${my + 250}
                C ${mx - 250} ${my - 40}, ${mx - 130} ${my - 240}, ${mx + 40} ${my - 230}
                C ${mx + 200} ${my - 222}, ${mx + 250} ${my - 60}, ${mx + 215} ${my + 60}
                L ${mx + 215} ${my + 250} Z`}
            fill="none"
            stroke={farben.tinte}
            strokeWidth={6}
            strokeLinejoin="round"
          />
          <ellipse
            cx={mx + 10}
            cy={my - 120}
            rx={165}
            ry={62}
            fill={farben.hilfslinie}
          />
          <text
            x={mx + 10}
            y={my - 108}
            textAnchor="middle"
            fontFamily={SCHRIFT}
            fontSize={schriftgroessen.stichwort}
            fill={farben.tinte}
          >
            Wissen
          </text>
          <ellipse
            cx={mx + 10}
            cy={my + 140}
            rx={150}
            ry={58}
            fill={farben.akzent}
            opacity={0.18 + 0.5 * lernen}
          />
          <text
            x={mx + 10}
            y={my + 152}
            textAnchor="middle"
            fontFamily={SCHRIFT}
            fontSize={schriftgroessen.stichwort}
            fill={farben.tinte}
          >
            Belohnung
          </text>
        </g>
        {Array.from({ length: segmente }).map((_, i) => {
          const t = i / (segmente - 1);
          const y = my - 50 + t * 130;
          const staerke = interpolate(t, [0, 0.55, 1], [9, 2, 0.6]);
          return (
            <line
              key={`p-${i}`}
              x1={mx + 10}
              y1={y}
              x2={mx + 10}
              y2={y + 4}
              stroke={farben.tinte}
              strokeWidth={staerke}
              strokeLinecap="round"
              opacity={pfeilAuf * (t < 0.9 ? 1 : 0.4)}
            />
          );
        })}
      </Buehne>
      <Bildtext text="Warum habe ich nicht einfach aufgehört?" ab={2} dauer={9} />
      <Bildtext text="Er lernt anders: durch Wiederholung." ab={19} dauer={9} />
    </>
  );
};

const STUFEN = ["Motivation", "Krankheitseinsicht", "Ursachen"];

/**
 * Szene 2.6 - Der Weg zurueck (3:05-3:30)
 * Die drei ersten Therapieschritte in der richtigen Reihenfolge.
 * Diese Grafik ist die Rahmengrafik des gesamten Films und kehrt
 * am Anfang jedes weiteren Kapitels wieder.
 */
export const Szene26: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const basisX = 0.2 * BREITE;
  const basisY = 0.78 * HOEHE;
  const stufeB = 330;
  const stufeH = 115;

  return (
    <>
      <Buehne>
        {STUFEN.map((name, i) => {
          const s = spring({
            frame: frame - sek(2 + i * 1.8),
            fps,
            config: { damping: 200 },
          });
          const x = basisX + i * stufeB;
          const y = basisY - i * stufeH;
          return (
            <g key={name} opacity={s}>
              <rect
                x={x}
                y={y - stufeH}
                width={stufeB}
                height={stufeH}
                fill="none"
                stroke={farben.tinte}
                strokeWidth={5}
              />
              <text
                x={x + stufeB / 2}
                y={y - stufeH / 2 + 12}
                textAnchor="middle"
                fontFamily={SCHRIFT}
                fontSize={schriftgroessen.stichwort}
                fill={farben.tinte}
              >
                {name}
              </text>
              <text
                x={x + 22}
                y={y - stufeH + 42}
                fontFamily={SCHRIFT}
                fontSize={26}
                fill={farben.gedaempft}
              >
                {i + 1}. Schritt
              </text>
            </g>
          );
        })}
        <g
          opacity={interpolate(frame, [sek(9), sek(11)], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        >
          <line
            x1={basisX + 3 * stufeB + 20}
            y1={basisY - 3 * stufeH}
            x2={basisX + 3 * stufeB + 150}
            y2={basisY - 3 * stufeH - 45}
            stroke={farben.gedaempft}
            strokeWidth={5}
            strokeDasharray="14 14"
            strokeLinecap="round"
          />
        </g>
      </Buehne>
      <Bildtext text="Der Weg heraus verläuft in der umgekehrten Richtung." ab={2} dauer={9} />
      <Bildtext text="Arbeitsblatt 3.1 — Die Einstiegs- und Suchtphase" ab={17} dauer={7} />
    </>
  );
};
