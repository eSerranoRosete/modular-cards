"use client";
import {
  CardContext,
  CardStoreProps,
  createCardStore,
} from "@/context/card/useCardStore";
import { useRef } from "react";

type CardPropviderProps = {
  state?: Partial<CardStoreProps>;
  children: React.ReactNode;
};

export function CardProvider({ state, children }: CardPropviderProps) {
  const store = useRef(createCardStore(state)).current;
  return <CardContext.Provider value={store}>{children}</CardContext.Provider>;
}
