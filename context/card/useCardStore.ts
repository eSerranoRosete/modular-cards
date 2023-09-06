import { createStore, useStore } from "zustand";
import { createContext, useContext } from "react";

import { TCard } from "@/server/card/CardTypes";

export interface CardStoreProps extends Partial<TCard> {
  avatar?: string;
  cover?: string;
  settings?: CardSettings;
}

export interface StoreState extends CardStoreProps {}

type CardSettings = {
  showContactButton?: boolean;
};

export interface CardStoreActions {
  setID: (id: TCard["id"]) => void;

  setTitle: (title: TCard["title"]) => void;
  setDescription: (description: TCard["description"]) => void;
  setOrganization: (organization: TCard["organization"]) => void;
  setAvatar: (avatar: string) => void;
  setCover: (cover: string) => void;

  setPhone: (phone: TCard["phone"]) => void;
  setEmail: (email: TCard["email"]) => void;

  setShowContactButton: (value?: boolean) => void;
}

export type Store = ReturnType<typeof createCardStore>;

export const createCardStore = (initProps?: Partial<CardStoreProps>) => {
  return createStore<StoreState & CardStoreActions>()((set) => ({
    ...initProps,

    setID: (id) => set({ id }),

    setTitle: (title) => set({ title }),
    setDescription: (description) => set({ description }),
    setOrganization: (organization) => set({ organization }),
    setAvatar: (avatar) => set({ avatar }),
    setCover: (cover) => set({ cover }),

    setPhone: (phone) => set({ phone }),
    setEmail: (email) => set({ email }),

    setShowContactButton: (value) =>
      set({ settings: { showContactButton: value } }),
  }));
};

export const CardContext = createContext<Store | null>(null);

export const cardStoreState = () => {
  const context = useContext(CardContext);

  if (!context)
    throw new Error("useCardStore must be used within a CardProvider");

  const state = useStore(context, (s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    organization: s.organization,
    avatar: s.avatar,
    cover: s.cover,
    phone: s.phone,
    email: s.email,
    settings: s.settings,
  }));

  return state;
};

export const cardStoreActions = () => {
  const context = useContext(CardContext);

  if (!context)
    throw new Error("useCardStore must be used within a CardProvider");

  const actions = useStore(context, (s) => ({
    setID: s.setID,
    setTitle: s.setTitle,
    setDescription: s.setDescription,
    setOrganization: s.setOrganization,
    setAvatar: s.setAvatar,
    setCover: s.setCover,
    setPhone: s.setPhone,
    setEmail: s.setEmail,
    setShowContactButton: s.setShowContactButton,
  }));

  return actions;
};
