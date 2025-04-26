import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { getUsersClient } from "@/src/service/user";
import { prismaClient } from "@/src/lib/db";
import { setSession } from "../utils/session";
import { cookies } from "next/headers";
import { env } from "@/env.mjs";
import { AppRouts } from "@/src/lib/app-routes";

const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export async function POST(req: NextRequest) {
  const usersClient = getUsersClient();
  const redirectUri = `${env.NEXT_PUBLIC_URL}${AppRouts.user.dashboard}`;

  try {
    const body = await req.json();

    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Check if user already exists
    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const output = await usersClient.create({
      name,
      email,
      password: hashedPassword,
    });

    await setSession(output.user);
    return Response.redirect(redirectUri, 307);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
