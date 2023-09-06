"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { Cards, getXataClient } from "@/xata";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface UpdateCardPayload extends Omit<Cards, "user"> {
  base64Avatar?: string;
  base64Cover?: string;
}

export const updateCard = async ({
  title,
  description,
  organization,
  id,
  base64Avatar,
  base64Cover,
}: UpdateCardPayload) => {
  const session = await getServerSession(options);

  if (!session?.user) {
    return;
  }

  const user = session.user;

  const xata = getXataClient();

  const currentCard = await xata.db.cards.filter({ id }).getFirst();

  if (!currentCard?.user) {
    throw new Error("Card not found");
  }

  if (currentCard.user.id !== user.id) {
    throw new Error("You don't have permission to update this card");
  }

  const avatar = base64Avatar?.split("data:image/png;base64,")[1];
  const cover = base64Cover?.split("data:image/png;base64,")[1];

  const card = await xata.db.cards.update(id, {
    title,
    description,
    organization,
    ...(base64Avatar && {
      avatar: {
        base64Content: avatar,
        mediaType: "image/jpg",
      },
    }),
    ...(base64Cover && {
      cover: {
        base64Content: cover,
        mediaType: "image/jpg",
      },
    }),
  });

  revalidatePath("/*");

  return card;
};
