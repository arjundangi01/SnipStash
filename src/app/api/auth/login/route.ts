import { env } from "@/env.mjs";
import { getUsersClient } from "@/src/service/user";
import { setSession } from "../utils/session";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { AppRouts } from "@/src/lib/app-routes";

export async function POST(req: NextRequest) {
  const usersClient = getUsersClient();
  const redirectUri = `${env.NEXT_PUBLIC_URL}${AppRouts.user.dashboard}`;

  try {
    const body = await req.json();

    const { email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await usersClient.login({ email, password: hashedPassword });
    await setSession(result.user);

    return NextResponse.redirect(redirectUri, 307);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
