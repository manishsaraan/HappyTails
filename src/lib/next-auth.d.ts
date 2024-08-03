import { Session, User } from "next-auth";

export type { Session };

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
  }
}
