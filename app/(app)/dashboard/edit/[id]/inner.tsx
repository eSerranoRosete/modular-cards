"use client";

import { CardProvider } from "@/context/card/CardProvider";
import { CardEditor } from "@/components/editor/CardEditor";
import { CardType } from "@/server/card/CardTypes";

type Props = {
  card: CardType;
};

export const EditCardInner = ({ card }: Props) => {
  return (
    <CardProvider state={card}>
      <CardEditor />
    </CardProvider>
  );
};
