import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./server-utils";
import { authSchema, TAuthFormData } from "./validations";

const config = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const result = authSchema.safeParse(credentials);
        console.log(result, "********************result");
        if (!result.success) {
          return null;
        }

        const user = await getUserByEmail(
          result.data.email.trim().toLowerCase()
        );
        console.log(user, "user   ");

        if (!user) {
          console.log("User does not exist");
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          result.data.password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          console.log("Password does not match");
          return null;
        }

        console.log(
          "User exists and validation*******************************"
        );
        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const isLoggedIn = !!auth?.user;
      const tryingToAccessApp = request.nextUrl.pathname.startsWith("/app");
      console.log(
        isLoggedIn,
        "*******tryingToAccessApp*************",
        tryingToAccessApp
      );
      if (isLoggedIn && tryingToAccessApp) {
        return true;
      }

      if (!isLoggedIn && tryingToAccessApp) {
        return false;
      }

      if (isLoggedIn && !tryingToAccessApp) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      if (!isLoggedIn && !tryingToAccessApp) {
        return true;
      }

      return false;
    },
    jwt({ token, user }) {
      // for server
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // for client
      if (session.user) {
        session.user.id = token.userId as string;
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
