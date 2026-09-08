import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

/**
 * Durchgehender Hintergrund mit langsam wanderndem Lichtschein.
 * Läuft über die gesamte Kapitellänge, damit die Szenenwechsel ruhig wirken.
 */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const drift = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: "clamp",
  });
  const x = interpolate(drift, [0, 1], [30, 70]);
  const y = interpolate(drift, [0, 1], [25, 60]);

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle at ${x}% ${y}%, ${theme.colors.backgroundAccent} 0%, ${theme.colors.background} 60%)`,
        }}
      />
    </AbsoluteFill>
  );
};
