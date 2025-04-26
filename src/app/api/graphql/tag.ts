import { Resolvers } from "@/src/gql/graphql";
import { getTagsClient } from "@/src/service/tags";

export const createTagResolvers = (): Resolvers => {
  return {
    Query: {
      tags: async (_, args, ctx) => {
        if (!ctx.user) {
          throw new Error("Unauthorized");
        }
        const tagsClient = getTagsClient();
        const tags = await tagsClient.listTags({});

        return tags.map((tag) => ({
          publicId: tag.publicId,
          name: tag.name,
        }));
      },
    },
  };
};
