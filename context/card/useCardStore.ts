import { createStore, useStore } from "zustand";
import { createContext, useContext } from "react";
import { CardType } from "@/server/card/CardTypes";

export interface CardStoreProps extends CardType {}

export interface StoreState extends CardStoreProps {}

export interface StoreActions {
  setID: (id: CardType["id"]) => void;

  setTitle: (title: CardType["title"]) => void;
  setDescription: (description: CardType["description"]) => void;
  setOrganization: (organization: CardType["organization"]) => void;
  setAvatar: (avatar: CardType["avatar"]) => void;
  setCover: (cover: CardType["cover"]) => void;

  setPhone: (phone: CardType["phone"]) => void;
  setEmail: (email: CardType["email"]) => void;

  setSettings: (settings: CardType["settings"]) => void;

  setSocial: (social: CardType["social"]) => void;
}

export type Store = ReturnType<typeof createCardStore>;

export const createCardStore = (initProps?: Partial<CardStoreProps>) => {
  const DEFAULT_PROPS: CardStoreProps = {
    social: [],
  };
  return createStore<StoreState & StoreActions>()((set, get) => ({
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

    setSettings: (settings) => {
      const { settings: currentSettings } = get();
      return set({ settings: { ...currentSettings, ...settings } });
    },

    setSocial: (social) => set({ social }),
  }));
};

export const CardContext = createContext<Store | null>(null);

export const useCardStore = () => {
  const context = useContext(CardContext);

  if (!context)
    throw new Error("useCardStore must be used within a CardProvider");

  const state: StoreState = useStore(context, (s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    organization: s.organization,
    avatar: s.avatar,
    cover: s.cover,
    phone: s.phone,
    email: s.email,
    settings: s.settings,
    social: s.social,
  }));

  const actions: StoreActions = useStore(context, (s) => ({
    setID: s.setID,
    setTitle: s.setTitle,
    setDescription: s.setDescription,
    setOrganization: s.setOrganization,
    setAvatar: s.setAvatar,
    setCover: s.setCover,
    setPhone: s.setPhone,
    setEmail: s.setEmail,
    setSettings: s.setSettings,
    setSocial: s.setSocial,
  }));

  return { state, actions };
};
