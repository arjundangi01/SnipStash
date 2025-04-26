import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

import { env } from "@/env.mjs";

export type Session = {
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
  userPublicId?: string;
};

export const getSession = () => {
  const session = getIronSession<Session>(cookies(), {
    cookieName: "fzs",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
    password: { 1: env.SESSION_SECRET },
    ttl: 60 * 60 * 24,
  });
  return session;
};
