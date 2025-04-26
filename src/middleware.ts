import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { cookies as getCookies, headers as getHeaders } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { env } from "@/env.mjs";
import { getSession } from "./app/api/graphql/session";

export const APP_URL = new URL(env.NEXT_PUBLIC_URL);

export const DEFAULT_RESPONSE_COOKIE: Partial<ResponseCookie> = {
  maxAge: 60 * 60 * 24 * 365, // 1y
};

export async function middleware(req: NextRequest) {
  const notFoundUrl = req.nextUrl.clone();
  notFoundUrl.pathname = "/404";
  const pathname = req.nextUrl.pathname;

  const resp = NextResponse.next();
  const session = (await getSession()).userPublicId;

  if (pathname.startsWith("/auth") && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname == "/" && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return resp;
}

export const config = {
  matcher: ["/auth/login", "/auth/signup", "/dashboard", "/snippets/new", "/"],
};
