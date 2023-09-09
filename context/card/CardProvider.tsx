"use client";
import { CardContext, createCardStore } from "@/context/card/useCardStore";
import { CardType } from "@/server/card/CardTypes";
import { useRef } from "react";

type CardPropviderProps = {
  state?: CardType;
  children: React.ReactNode;
};

export function CardProvider({ state, children }: CardPropviderProps) {
  const store = useRef(createCardStore(state)).current;
  return <CardContext.Provider value={store}>{children}</CardContext.Provider>;
}
