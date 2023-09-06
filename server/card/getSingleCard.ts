"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getXataClient } from "@/xata";
import { getServerSession } from "next-auth";

type Props = {
  cardID: string;
};

export const getSingleCard = async ({ cardID }: Props) => {
  const session = await getServerSession(options);

  if (!session?.user) {
    return;
  }

  const { id } = session.user;

  const xata = getXataClient();

  const card = await xata.db.cards.filter("id", cardID).getFirst();

  // Return null if no card is found
  if (!card) return null;

  // Return null if the card does not belong to the user
  if (card.user?.id !== id) return null;

  return card;
};
