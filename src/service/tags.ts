import {
  Prisma,
  type PrismaClient,
  Snippet as PrismaSnippet,
  Tag as PrismaTag,
} from "@prisma/client";
import { prismaClient } from "@/src/lib/db";
import { getPublicId } from "@/src/lib/id";

let client: TagsService | null = null;

export type ListSnippetTagsInput = {
  snippetId: string;
};

export type ListTagsInput = {
  names: string[];
};

export type GetTagInput = {
  publicId: string;
};

export const getTagsClient = () => {
  if (!client) {
    client = new TagsService();
  }
  return client;
};

export class TagsService {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }

  async listSnippetTags(input: ListSnippetTagsInput) {
    return this.prismaClient.snippetTag.findMany({
      where: {
        snippetId: input.snippetId,
      },
      include: {
        tag: true,
      },
    });
  }

  async listTags(input: ListTagsInput) {
    return this.prismaClient.tag.findMany({
      where: {
        name: { in: input.names },
      },
    });
  }

  async createTags(input: string[]) {
    const existingTags = await this.listTags({ names: input });

    const newTags = input.filter(
      (tag) => !existingTags.some((t) => t.name === tag)
    );

    const createdTags = await this.prismaClient.tag.createMany({
      data: newTags.map((tag) => {
        const publicId = getPublicId("tag");
        return { name: tag, publicId };
      }),
    });

    return createdTags;
  }

  async deleteSnippetTags(snippetId: string) {
    return this.prismaClient.snippetTag.deleteMany({
      where: { snippetId },
    });
  }

  async getTag(input: GetTagInput) {
    return this.prismaClient.tag.findUnique({
      where: { publicId: input.publicId },
    });
  }
}
