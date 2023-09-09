"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getXataClient } from "@/xata";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { CardType } from "./CardTypes";
import { processBase64 } from "@/lib/processBase64";

export const createCard = async (values: CardType): Promise<string | null> => {
  const session = await getServerSession(options);

  if (!session?.user) {
    return null;
  }

  const { id } = session.user;

  const xata = getXataClient();

  const avatar = processBase64(values.avatar?.base64Content);
  const cover = processBase64(values.cover?.base64Content);

  const card = await xata.db.card.create({
    ...values,

    ...(avatar && { avatar }),
    ...(cover && { cover }),

    user: { id },
  });

  revalidatePath("/*");

  return card.id;
};
