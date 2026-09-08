import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

const FADE = 12;

/**
 * Einheitlicher Rahmen für jede Szene: Seitenränder, Schrift und ein
 * kurzes Ein- und Ausblenden, damit die Übergänge nicht hart schneiden.
 */
export const SceneFrame: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, FADE, Math.max(durationInFrames - FADE, FADE + 1), durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        opacity,
        fontFamily: theme.fontFamily,
        color: theme.colors.text,
        padding: theme.spacing.page,
        paddingTop: 200,
        paddingBottom: 180,
        justifyContent: "center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
