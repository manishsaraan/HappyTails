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

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const isLoggedIn = !!auth?.user;
      const tryingToAccessApp = request.nextUrl.pathname.startsWith("/app");

      if (isLoggedIn && tryingToAccessApp && auth?.user.hasAccess) {
        return true;
      }

      if (!isLoggedIn && tryingToAccessApp) {
        return false;
      }

      if (
        isLoggedIn &&
        (request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/payment") ||
          request.nextUrl.pathname.includes("/signup")) &&
        auth?.user.hasAccess
      ) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      if (isLoggedIn && !tryingToAccessApp && !auth?.user.hasAccess) {
        if (
          request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")
        ) {
          console.log("redirecting to payment");

          return Response.redirect(new URL("/payment", request.nextUrl));
        }
        console.log("returning true");
        return true;
      }

      if (isLoggedIn && !tryingToAccessApp) {
        return true;
      }

      if (!isLoggedIn && !tryingToAccessApp) {
        return true;
      }

      return false;
    },
    async jwt({ token, user, trigger }) {
      // for login user will be set for first time
      if (user) {
        token.userId = user.id;
        token.hasAccess = user.hasAccess;
        token.email = user.email as string;
      }

      if (trigger === "update") {
        // for every reqeust
        const user = await getUserByEmail(token.email);
        if (user) {
          token.hasAccess = user.hasAccess;
        }
      }

      return token;
    },
    session({ session, token }) {
      // for client
      session.user.id = token.userId as string;
      session.user.hasAccess = token.hasAccess as boolean;
      session.user.email = token.email as string;

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
