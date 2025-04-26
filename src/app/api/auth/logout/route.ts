import { env } from "@/env.mjs";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../graphql/session";

export async function POST(req: NextRequest) {
  const redirectUri = env.NEXT_PUBLIC_URL;

  try {
    const session = await getSession();
    session.destroy();

    return NextResponse.redirect(redirectUri, 307);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
