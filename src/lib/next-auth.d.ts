import { Session, User } from "next-auth";

export type { Session };

declare module "next-auth" {
  interface User {
    hasAccess: boolean;
    email: string;
  }
  interface Session {
    user: User & {
      id: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    hasAccess: boolean;
    email: string;
  }
}
