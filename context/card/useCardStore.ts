import { createStore } from "zustand";
import { createContext } from "react";

export interface CardStoreProps {
  title?: string;
  description?: string;
  organization?: string;
  avatar?: string;
  cover?: string;
}

export interface StoreState extends CardStoreProps {}

export interface CardStoreActions {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setOrganization: (organization: string) => void;
  setAvatar: (avatar: string) => void;
  setCover: (cover: string) => void;
}

export type Store = ReturnType<typeof createCardStore>;

export const createCardStore = (initProps?: Partial<CardStoreProps>) => {
  const DEFAULT_PROPS: CardStoreProps = {};
  return createStore<StoreState & CardStoreActions>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,

    setTitle: (title) => set({ title }),
    setDescription: (description) => set({ description }),
    setOrganization: (organization) => set({ organization }),
    setAvatar: (avatar) => set({ avatar }),
    setCover: (cover) => set({ cover }),
  }));
};

export const CardContext = createContext<Store | null>(null);
