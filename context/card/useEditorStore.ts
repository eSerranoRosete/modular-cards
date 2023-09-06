import { create } from "zustand";

export type EditorTab = "basic" | "contact" | "modules" | "social" | "settings";

type EditorState = {
  activeTab: EditorTab;
};

type EditorActions = {
  setActiveTab: (tab: EditorTab) => void;
};

export const useEditorStore = create<EditorState & EditorActions>((set) => ({
  activeTab: "basic",
  setActiveTab: (activeTab) => set({ activeTab }),
}));
