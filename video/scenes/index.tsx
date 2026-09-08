import React from "react";
import type { Scene } from "../types";
import { BulletsSceneView } from "./BulletsSceneView";
import { OutroSceneView } from "./OutroSceneView";
import { StatementSceneView } from "./StatementSceneView";
import { TitleSceneView } from "./TitleSceneView";

/** Wählt die Darstellung passend zum Szenentyp aus der Datendatei. */
export const SceneView: React.FC<{ scene: Scene }> = ({ scene }) => {
  switch (scene.type) {
    case "title":
      return <TitleSceneView scene={scene} />;
    case "bullets":
      return <BulletsSceneView scene={scene} />;
    case "statement":
      return <StatementSceneView scene={scene} />;
    case "outro":
      return <OutroSceneView scene={scene} />;
  }
};
