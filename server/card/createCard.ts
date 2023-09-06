"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { Card, getXataClient } from "@/xata";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { CardStoreProps } from "@/context/card/useCardStore";

export const createCard = async (values: CardStoreProps) => {
  const session = await getServerSession(options);

  if (!session?.user) {
    return;
  }

  const { id } = session.user;

  const xata = getXataClient();

  const avatar = values.avatar?.split(",")[1];
  const cover = values.cover?.split(",")[1];

  const card = await xata.db.card.create({
    ...values,
    user: { id },
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

  return card.id;
};
