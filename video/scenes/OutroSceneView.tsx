import React from "react";
import { interpolate } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { useEntrance } from "../components/useEntrance";
import { theme } from "../theme";
import type { OutroScene } from "../types";

export const OutroSceneView: React.FC<{ scene: OutroScene }> = ({ scene }) => {
  const title = useEntrance(0);
  const note = useEntrance(12);

  return (
    <SceneFrame durationInFrames={scene.durationInFrames}>
      <div style={{ textAlign: "center", width: "100%" }}>
        <div
          style={{
            opacity: title,
            transform: `translateY(${interpolate(title, [0, 1], [24, 0])}px)`,
            fontSize: theme.fontSize.heading,
            fontWeight: 700,
          }}
        >
          {scene.title}
        </div>

        {scene.note ? (
          <div
            style={{
              opacity: note,
              marginTop: 30,
              color: theme.colors.textMuted,
              fontSize: theme.fontSize.subtitle,
            }}
          >
            {scene.note}
          </div>
        ) : null}
      </div>
    </SceneFrame>
  );
};
