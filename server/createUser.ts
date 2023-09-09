"use server";

import { getXataClient } from "@/xata";
import { hash } from "bcrypt";

type User = {
  email: string;
  password: string;
  name: string;
};

const xata = getXataClient();

type Response = {
  error?: string;
  userID?: string;
};

export const createUser = async ({
  email,
  password,
  name,
}: User): Promise<Response> => {
  try {
    const hashed = await hash(password, 10);

    const user = await xata.db.user.create({ email, password: hashed, name });

    return {
      userID: user.id,
    };
  } catch (error: any) {
    switch (error.status) {
      case 400:
        return {
          error: "Email already in use",
        };
      default:
        return {
          error: "Something went wrong",
        };
    }
  }
};
