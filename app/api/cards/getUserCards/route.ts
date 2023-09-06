import { getXataClient } from "@/xata";

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const xata = getXataClient();

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "Not logged in" });
  }

  const { id } = token;

  const Card = await xata.db.Card.filter("user.id", id).getMany();

  return NextResponse.json(Card);
}
