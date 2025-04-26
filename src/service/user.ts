import { Prisma, type PrismaClient, User as PrismaUser } from "@prisma/client";
import { prismaClient } from "@/src/lib/db";
import { randomBytes } from "crypto";
import { env } from "@/env.mjs";
import * as jwt from "jsonwebtoken";
import { getPublicId } from "@/src/lib/id";
import bcrypt from "bcrypt";

export type User = {
  id: number;
  publicId: string;
  email: string;
  name: string;
  createdAt: Date;
};

export type CreateInput = {
  email: string;
  name: string;
  password: string;
  redirectUri?: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type GetInput = {
  publicId: string;
};

let client: UserService | null = null;

export const getUsersClient = () => {
  if (!client) {
    client = new UserService();
  }
  return client;
};

export class UserService {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }

  async create(input: CreateInput): Promise<{
    user: User;
    token: string;
  }> {
    const publicId = getPublicId("user");
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const result = await this.prismaClient.user.create({
      data: {
        publicId,
        email: input.email,
        name: input.name,
        password: hashedPassword,
      },
    });

    const token = getJWTToken({ id: result.id });

    return {
      user: result,
      token,
    };
  }

  async login(input: LoginInput): Promise<{
    user: User;
    token: string;
  }> {
    const user = await this.prismaClient.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const token = getJWTToken({ id: user.id });

    return {
      user,
      token,
    };
  }

  async get(input: GetInput): Promise<User> {
    const user = await this.prismaClient.user.findUnique({
      where: { publicId: input.publicId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

const getJWTToken = (payload: object, expiresIn: number = 7) => {
  const JWT_SECRET: string = env.JWT_SECRET;

  return jwt.sign({ data: payload }, JWT_SECRET, {
    ...(expiresIn > 0 && { expiresIn: `${expiresIn}h` }),
  });
};
