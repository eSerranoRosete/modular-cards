"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getXataClient } from "@/xata";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { CardStoreProps } from "@/context/card/useCardStore";

// interface UpdateCardPayload extends Omit<Card, "user" | "avatar" | "cover"> {
//   base64Avatar?: string;
//   base64Cover?: string;
// }

export const updateCard = async (values: CardStoreProps) => {
  const session = await getServerSession(options);

  if (!session?.user) {
    return;
  }

  const user = session.user;

  const xata = getXataClient();

  const currentCard = await xata.db.card.filter({ id: values.id }).getFirst();

  if (!currentCard?.user) {
    throw new Error("Card not found");
  }

  if (currentCard.user.id !== user.id) {
    throw new Error("You don't have permission to update this card");
  }

  const avatar = values.avatar?.split("data:image/png;base64,")[1];
  const cover = values.cover?.split("data:image/png;base64,")[1];

  const card = await xata.db.card.update(currentCard.id, {
    ...values,
    ...(avatar && {
      avatar: {
        base64Content: avatar,
        mediaType: "image/jpg",
      },
    }),
    ...(cover && {
      cover: {
        base64Content: cover,
        mediaType: "image/jpg",
      },
    }),
  });

  revalidatePath("/*");

  return card?.id;
};
