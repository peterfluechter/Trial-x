import React from "react";
import { interpolate } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { useEntrance } from "../components/useEntrance";
import { theme } from "../theme";
import type { BulletsScene } from "../types";

const Bullet: React.FC<{ text: string; index: number }> = ({ text, index }) => {
  const entrance = useEntrance(18 + index * 12);

  return (
    <li
      style={{
        opacity: entrance,
        transform: `translateX(${interpolate(entrance, [0, 1], [50, 0])}px)`,
        display: "flex",
        alignItems: "flex-start",
        gap: 26,
        marginBottom: 30,
      }}
    >
      <span
        style={{
          marginTop: 18,
          width: 16,
          height: 16,
          flexShrink: 0,
          borderRadius: 8,
          backgroundColor: theme.colors.accent,
        }}
      />
      <span style={{ fontSize: theme.fontSize.body, lineHeight: 1.4 }}>{text}</span>
    </li>
  );
};

export const BulletsSceneView: React.FC<{ scene: BulletsScene }> = ({ scene }) => {
  const heading = useEntrance(0);

  return (
    <SceneFrame durationInFrames={scene.durationInFrames}>
      <div
        style={{
          opacity: heading,
          transform: `translateY(${interpolate(heading, [0, 1], [30, 0])}px)`,
          fontSize: theme.fontSize.heading,
          fontWeight: 700,
          marginBottom: 56,
        }}
      >
        {scene.heading}
      </div>

      <ul style={{ listStyle: "none", margin: 0, padding: 0, maxWidth: 1500 }}>
        {scene.bullets.map((text, index) => (
          <Bullet key={text} text={text} index={index} />
        ))}
      </ul>
    </SceneFrame>
  );
};
