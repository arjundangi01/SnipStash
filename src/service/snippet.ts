import { Prisma, type PrismaClient, Tag as PrismaTag } from "@prisma/client";
import { prismaClient } from "@/src/lib/db";
import { getPublicId } from "@/src/lib/id";
import { detectTags } from "@/src/lib/auto-tag";
import { getTagsClient } from "./tags";

export type Snippet = {
  id: number;
  publicId: string;
  title: string;
  code: string;
  description?: string | null;
  language: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: PrismaTag[];
};

export type CreateSnippetInput = {
  title: string;
  code: string;
  language: string;
  description?: string;
  userId: string;
  tags?: string[];
};

export type UpdateSnippetInput = {
  title?: string;
  code?: string;
  language?: string;
  description?: string;
  tags?: string[];
};

export type GetSnippetInput = {
  publicId: string;
};

export type GetUserSnippetsInput = {
  userId: string;
  search?: string;
  languages?: string[];
  tagIds?: string[];
};

let client: SnippetService | null = null;

export const getSnippetsClient = () => {
  if (!client) {
    client = new SnippetService();
  }
  return client;
};

export class SnippetService {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }

  async create(input: CreateSnippetInput): Promise<Snippet> {
    const publicId = getPublicId("snippet");

    // Auto-detect tags from code
    const autoDetectedTags = await detectTags(input.code);

    // Combine auto-detected tags with user-provided tags
    const allTags = Array.from(
      new Set([...(input.tags || []), ...autoDetectedTags])
    );

    await getTagsClient().createTags(allTags);

    // get tags
    const allTagsFromDb = await getTagsClient().listTags({
      names: allTags,
    });

    // Create snippet
    const snippet = await this.prismaClient.snippet.create({
      data: {
        publicId,
        title: input.title,
        code: input.code,
        language: input.language,
        description: input.description,
        userId: input.userId,
        snippetTags: {
          create: allTagsFromDb.map((tag) => {
            const publicId = getPublicId("snippet-tag");
            return {
              publicId,
              tag: {
                connect: { id: tag.id },
              },
            };
          }),
        },
      },
    });

    return {
      ...snippet,
      description: snippet.description,
    };
  }

  async update({
    publicId,
    input,
    userId,
  }: {
    publicId: string;
    input: UpdateSnippetInput;
    userId: string;
  }): Promise<Snippet> {
    const snippet = await this.prismaClient.snippet.findUnique({
      where: { publicId, userId },
      include: { snippetTags: true },
    });

    if (!snippet) {
      throw new Error("Snippet not found");
    }

    let autoDetectedTags: string[] = [];

    if (input.code) {
      // Auto-detect tags from updated code
      autoDetectedTags = await detectTags(input.code);
    }

    // Combine auto-detected tags with user-provided tags
    const allTags = Array.from(
      new Set([...(input.tags || []), ...autoDetectedTags])
    );

    await getTagsClient().createTags(allTags);

    const allTagsFromDb = await getTagsClient().listTags({
      names: allTags,
    });

    // Update snippet
    const updatedSnippet = await this.prismaClient.snippet.update({
      where: { publicId },
      data: {
        ...(input.title && { title: input.title }),
        ...(input.code && { code: input.code }),
        ...(input.language && { language: input.language }),
        ...(input.description !== undefined && {
          description: input.description,
        }),
        updatedAt: new Date(),
        snippetTags: {
          deleteMany: {},
          create: allTagsFromDb.map((tag) => {
            const publicId = getPublicId("snippet-tag");
            return {
              publicId,
              tag: {
                connect: { id: tag.id },
              },
            };
          }),
        },
      },
    });

    return {
      ...updatedSnippet,
      description: updatedSnippet.description,
    };
  }

  async delete({
    publicId,
    userId,
  }: {
    publicId: string;
    userId: string;
  }): Promise<void> {
    const snippet = await this.prismaClient.snippet.findUnique({
      where: { publicId, userId },
    });

    if (!snippet) {
      throw new Error("Snippet not found");
    }

    // Delete the snippet
    await this.prismaClient.snippet.delete({
      where: { publicId },
    });
  }

  async get(input: GetSnippetInput): Promise<Snippet> {
    const snippet = await this.prismaClient.snippet.findUnique({
      where: { publicId: input.publicId },
    });

    if (!snippet) {
      throw new Error("Snippet not found");
    }

    return snippet;
  }

  async getUserSnippets(input: GetUserSnippetsInput): Promise<{
    snippets: Snippet[];
  }> {
    // Build filter conditions
    const where: Prisma.SnippetWhereInput = { userId: input.userId };

    if (input.search) {
      where.OR = [
        { title: { contains: input.search, mode: "insensitive" } },
        { code: { contains: input.search, mode: "insensitive" } },
        { description: { contains: input.search, mode: "insensitive" } },
        {
          snippetTags: {
            some: {
              tag: { name: { contains: input.search, mode: "insensitive" } },
            },
          },
        },
        {
          language: { contains: input.search, mode: "insensitive" },
        },
      ];
    }

    if (input.languages?.length) {
      where.language = { in: input.languages };
    }

    if (input.tagIds?.length) {
      where.snippetTags = {
        some: {
          tagId: { in: input.tagIds },
        },
      };
    }

    const snippets = await this.prismaClient.snippet.findMany({
      where,
    });

    return {
      snippets: snippets as Snippet[],
    };
  }

  async getLanguages(
    userId: string
  ): Promise<Array<{ name: string; count: number }>> {
    const languageCounts = await this.prismaClient.snippet.groupBy({
      by: ["language"],
      where: { userId },
      _count: true,
    });

    return languageCounts.map((item) => ({
      name: item.language,
      count: item._count,
    }));
  }
}
