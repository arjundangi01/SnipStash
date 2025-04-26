import { env } from "@/env.mjs";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../graphql/session";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    session.destroy();

    return NextResponse.json({
      message: "logout success",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
