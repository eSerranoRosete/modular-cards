"use client";

import { CardRecord } from "@/xata";

import { CardProvider } from "@/context/card/CardProvider";
import { CardEditor } from "@/components/editor/CardEditor";

type StudioEditCardInnerProps = {
  card: CardRecord;
};

export const StudioEditCardInner = ({ card }: StudioEditCardInnerProps) => {
  return (
    <CardProvider
      state={{
        ...card,
        avatar: card.avatar?.url,
        cover: card.cover?.url,
      }}
    >
      <CardEditor />
    </CardProvider>
  );
};
