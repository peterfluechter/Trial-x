import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

/**
 * Dauerhafte Bildelemente: Kapitelkennung oben, Fortschrittsbalken unten.
 * Liegt außerhalb der Szenenfolge und sieht daher die absolute Frame-Nummer.
 */
export const ChapterFrame: React.FC<{ label: string; title: string }> = ({
  label,
  title,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames - 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ fontFamily: theme.fontFamily }}>
      <div
        style={{
          position: "absolute",
          top: 64,
          left: theme.spacing.page,
          right: theme.spacing.page,
          display: "flex",
          alignItems: "center",
          gap: 20,
          color: theme.colors.textMuted,
          fontSize: theme.fontSize.caption,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: theme.colors.accent, fontWeight: 700 }}>{label}</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span>{title}</span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 8,
          backgroundColor: theme.colors.accentMuted,
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            backgroundColor: theme.colors.accent,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
