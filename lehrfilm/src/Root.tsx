import React from "react";
import { Composition } from "remotion";
import { Kapitel02 } from "./Kapitel02";
import { BREITE, FPS, GESAMT_FRAMES, HOEHE } from "./thema";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Kapitel02"
        component={Kapitel02}
        durationInFrames={GESAMT_FRAMES}
        fps={FPS}
        width={BREITE}
        height={HOEHE}
      />
    </>
  );
};
