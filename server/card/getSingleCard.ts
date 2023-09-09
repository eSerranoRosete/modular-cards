"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getXataClient } from "@/xata";
import { getServerSession } from "next-auth";
import { CardType } from "./CardTypes";

type Props = {
  cardID: string;
};

export const getSingleCard = async ({
  cardID,
}: Props): Promise<CardType | null> => {
  const session = await getServerSession(options);

  if (!session?.user) {
    return null;
  }

  const { id } = session.user;

  const xata = getXataClient();

  const card = await xata.db.card.filter("id", cardID).getFirst();

  // Return null if no card is found
  if (!card) return null;

  // Return null if the card does not belong to the user
  if (card.user?.id !== id) return null;

  return card.toSerializable() as CardType;
};
