import React from "react";
import { interpolate } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { useEntrance } from "../components/useEntrance";
import { theme } from "../theme";
import type { StatementScene } from "../types";

export const StatementSceneView: React.FC<{ scene: StatementScene }> = ({ scene }) => {
  const text = useEntrance(0);
  const source = useEntrance(16);

  return (
    <SceneFrame durationInFrames={scene.durationInFrames}>
      <div
        style={{
          opacity: text,
          transform: `scale(${interpolate(text, [0, 1], [0.96, 1])})`,
          borderLeft: `10px solid ${theme.colors.accent}`,
          paddingLeft: 56,
          maxWidth: 1500,
        }}
      >
        <div
          style={{
            fontSize: theme.fontSize.statement,
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          {scene.text}
        </div>

        {scene.source ? (
          <div
            style={{
              opacity: source,
              marginTop: 34,
              color: theme.colors.textMuted,
              fontSize: theme.fontSize.caption,
              letterSpacing: 1,
            }}
          >
            {scene.source}
          </div>
        ) : null}
      </div>
    </SceneFrame>
  );
};
