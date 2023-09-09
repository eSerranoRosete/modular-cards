import { useState } from "react";

export type EditorTab = "basic" | "contact" | "modules" | "social" | "settings";

export const useEditorNav = () => {
  const [tab, setTab] = useState<EditorTab>("basic");

  return { tab, setTab };
};
