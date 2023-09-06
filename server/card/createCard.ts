"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { Cards, getXataClient } from "@/xata";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface CreateCardPayload
  extends Omit<Cards, "user" | "id" | "avatar" | "cover"> {
  base64Avatar?: string;
  base64Cover?: string;
}

export const createCard = async ({
  base64Avatar,
  base64Cover,
  ...values
}: CreateCardPayload) => {
  const session = await getServerSession(options);

  if (!session?.user) {
    return;
  }

  const { id } = session.user;

  const xata = getXataClient();

  const avatar = base64Avatar?.split(",")[1];
  const cover = base64Cover?.split(",")[1];

  const card = await xata.db.cards.create({
    ...values,
    user: { id },
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

  return card.id;
};
