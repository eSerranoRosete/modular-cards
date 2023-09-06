"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getXataClient } from "@/xata";
import { getServerSession } from "next-auth";

export const getUserCards = async () => {
  const session = await getServerSession(options);

  if (!session?.user) {
    return;
  }

  const { id } = session.user;

  const xata = getXataClient();

  const cards = await xata.db.cards.filter("user.id", id).getMany();

  return cards;
};
