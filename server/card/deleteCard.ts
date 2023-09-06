"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getXataClient } from "@/xata";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface DeleteCardPayload {
  cardID: string;
}

export const deleteCard = async ({ cardID }: DeleteCardPayload) => {
  const session = await getServerSession(options);

  if (!session?.user) {
    return;
  }

  const { id } = session.user;

  const xata = getXataClient();

  const card = await xata.db.cards.filter({ id: cardID }).getFirst();

  if (!card) {
    return;
  }

  if (card.user?.id !== id) {
    return;
  }

  await card.delete();

  revalidatePath("/*");
};
