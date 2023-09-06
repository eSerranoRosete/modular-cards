import { createStore, useStore } from "zustand";
import { createContext, useContext } from "react";
import { CardsRecord } from "@/xata";

export interface CardStoreProps
  extends Omit<Partial<CardsRecord>, "avatar" | "cover" | "user"> {
  avatar?: string;
  cover?: string;
}

export interface StoreState extends CardStoreProps {}

export interface CardStoreActions {
  setID: (id: string) => void;

  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setOrganization: (organization: string) => void;
  setAvatar: (avatar: string) => void;
  setCover: (cover: string) => void;

  setPhone: (phone: string) => void;
  setEmail: (email: string) => void;
}

export type Store = ReturnType<typeof createCardStore>;

export const createCardStore = (initProps?: Partial<CardStoreProps>) => {
  const DEFAULT_PROPS: CardStoreProps = {};
  return createStore<StoreState & CardStoreActions>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,

    setID: (id) => set({ id }),

    setTitle: (title) => set({ title }),
    setDescription: (description) => set({ description }),
    setOrganization: (organization) => set({ organization }),
    setAvatar: (avatar) => set({ avatar }),
    setCover: (cover) => set({ cover }),

    setPhone: (phone) => set({ phone }),
    setEmail: (email) => set({ email }),
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
  }));

  return actions;
};
