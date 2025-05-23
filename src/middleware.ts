import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getSession } from "./app/api/graphql/session";

const protectedRoutes = ["/dashboard", "/snippets"];

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

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return resp;
}

export const config = {
  matcher: ["/auth/login", "/auth/signup", "/dashboard", "/snippets/new", "/"],
};
