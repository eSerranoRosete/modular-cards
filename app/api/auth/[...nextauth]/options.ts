import { getXataClient } from "@/xata";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const xata = getXataClient();

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        const user = await xata.db.users
          .filter("email", credentials?.username)
          .getFirst();

        if (!user || !credentials?.username || !credentials?.password) {
          return null;
        }

        const valid = await compare(credentials.password, user.password!);

        // If no error and we have user data, return it
        if (valid) {
          return user;
        } else {
          // Return null if user data could not be retrieved
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.id = user.id;

      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) session.user.id = token.id;
      return session;
    },
  },
};
