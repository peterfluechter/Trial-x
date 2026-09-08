import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BREITE, HOEHE, farben, schriftgroessen, sek } from "../thema";
import { SCHRIFT } from "../schrift";
import { Bildtext, Buehne, Figur } from "../bausteine/Basis";

/**
 * Szene 2.1 - Die Frage (0:00-0:25)
 * Kapiteltitel, danach eine einzelne Figur im leeren Raum.
 * Sprechertext: "Fast jeder, der hier ankommt ... nichts mit Charakterschwaeche zu tun."
 */
export const Szene21: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titelAuf = spring({ frame: frame - sek(0.5), fps, config: { damping: 200 } });
  const titelAb = interpolate(frame, [sek(6), sek(7.5)], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const figurAuf = interpolate(frame, [sek(7), sek(9)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <Buehne grundlinie={false}>
        <g opacity={figurAuf}>
          <Figur x={BREITE / 2} y={0.78 * HOEHE} gehphase={null} />
        </g>
      </Buehne>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: titelAuf * titelAb,
        }}
      >
        <div
          style={{
            fontFamily: SCHRIFT,
            fontWeight: 700,
            fontSize: 96,
            color: farben.tinte,
            transform: `translateY(${interpolate(titelAuf, [0, 1], [40, 0])}px)`,
          }}
        >
          Der Weg in die Sucht
        </div>
      </AbsoluteFill>
      <Bildtext text="Wie ist es so weit gekommen?" ab={11} dauer={9} />
    </>
  );
};

const STICHWORTE = [
  "Anspannung",
  "Dazugehören",
  "Nicht abschalten können",
  "Konflikte",
  "Langeweile",
  "Keine Perspektive",
];

/**
 * Szene 2.2 - Der Einstieg hat viele Gruende (0:25-1:10)
 * Pfeile laufen aus allen Richtungen auf die Figur zu und bleiben stehen.
 * Regiehinweis Drehbuch: Stichworte nur einblenden, nicht sprechen.
 */
export const Szene22: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mx = BREITE / 2;
  const my = 0.62 * HOEHE;
  const radius = 430;

  return (
    <>
      <Buehne grundlinie={false}>
        {STICHWORTE.map((wort, i) => {
          const winkel = (Math.PI * (i + 0.5)) / STICHWORTE.length + Math.PI;
          const startX = mx + Math.cos(winkel) * radius * 1.55;
          const startY = my + Math.sin(winkel) * radius * 1.05;
          const zielX = mx + Math.cos(winkel) * 150;
          const zielY = my + Math.sin(winkel) * 105;

          const s = spring({
            frame: frame - sek(3 + i * 1.6),
            fps,
            config: { damping: 200 },
          });
          const x = interpolate(s, [0, 1], [startX, zielX]);
          const y = interpolate(s, [0, 1], [startY, zielY]);

          return (
            <g key={wort} opacity={s}>
              <line
                x1={startX}
                y1={startY}
                x2={x}
                y2={y}
                stroke={farben.gedaempft}
                strokeWidth={5}
                strokeLinecap="round"
              />
              <circle cx={x} cy={y} r={9} fill={farben.gedaempft} />
              <text
                x={startX}
                y={startY - 26}
                textAnchor="middle"
                fontFamily={SCHRIFT}
                fontSize={schriftgroessen.stichwort}
                fill={farben.tinte}
              >
                {wort}
              </text>
            </g>
          );
        })}
        <Figur x={mx} y={my + 120} gehphase={null} />
      </Buehne>
      <Bildtext text="Am Anfang steht kein einziger Grund, sondern viele." ab={15} dauer={12} />
    </>
  );
};
