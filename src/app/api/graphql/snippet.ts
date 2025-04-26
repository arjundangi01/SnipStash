import { Resolvers } from "@/src/gql/graphql";
import { getSnippetsClient } from "@/src/service/snippet";
import { getTagsClient } from "@/src/service/tags";

export const createSnippetResolvers = (): Resolvers => {
  return {
    Mutation: {
      createSnippet: async (_, args, ctx) => {
        if (!ctx.user) {
          throw new Error("Authentication required");
        }

        const snippetsClient = getSnippetsClient();
        try {
          const snippet = await snippetsClient.create({
            title: args.input.title,
            language: args.input.language,
            code: args.input.code,
            description: args.input.description || undefined,
            userId: ctx.user.publicId,
            tags: args.input.tags,
          });

          // Format tags to match the GraphQL schema
          const formattedTags = (snippet.tags || []).map((tag) => ({
            id: String(tag.id),
            publicId: tag.publicId,
            name: tag.name,
            createdAt: tag.createdAt.toISOString(),
            updatedAt: tag.updatedAt.toISOString(),
          }));

          return {
            id: String(snippet.id),
            publicId: snippet.publicId,
            title: snippet.title,
            code: snippet.code,
            description: snippet.description,
            language: snippet.language,
            createdAt: snippet.createdAt.toISOString(),
            updatedAt: snippet.updatedAt.toISOString(),
            tags: formattedTags,
          };
        } catch (error) {
          console.error("Failed to create snippet:", error);
          throw new Error("Failed to create snippet");
        }
      },
      updateSnippet: async (_, args, ctx) => {
        if (!ctx.user) {
          throw new Error("Authentication required");
        }

        const snippetsClient = getSnippetsClient();
        try {
          const snippet = await snippetsClient.update({
            publicId: args.input.publicId,

            input: {
              title: args.input.title || undefined,
              language: args.input.language || undefined,
              code: args.input.code || undefined,
              description: args.input.description || undefined,
              tags: args.input.tags || undefined,
            },
            userId: ctx.user.publicId,
          });

          // Format tags to match the GraphQL schema
          const formattedTags = (snippet.tags || []).map((tag) => ({
            id: String(tag.id),
            publicId: tag.publicId,
            name: tag.name,
            createdAt: tag.createdAt.toISOString(),
            updatedAt: tag.updatedAt.toISOString(),
          }));

          return {
            id: String(snippet.id),
            publicId: snippet.publicId,
            title: snippet.title,
            code: snippet.code,
            description: snippet.description,
            language: snippet.language,
            createdAt: snippet.createdAt.toISOString(),
            updatedAt: snippet.updatedAt.toISOString(),
            tags: formattedTags,
          };
        } catch (error) {
          console.error("Failed to update snippet:", error);
          throw new Error("Failed to update snippet");
        }
      },
      deleteSnippet: async (_, args, ctx) => {
        if (!ctx.user) {
          throw new Error("Authentication required");
        }

        const snippetsClient = getSnippetsClient();
        try {
          await snippetsClient.delete({
            publicId: args.input.publicId,
            userId: ctx.user.publicId,
          });
          return true;
        } catch (error) {
          console.error("Failed to delete snippet:", error);
          throw new Error("Failed to delete snippet");
        }
      },
    },

    Query: {
      snippet: async (_, args, ctx) => {
        if (!ctx.user) {
          throw new Error("Authentication required");
        }

        const snippetsClient = getSnippetsClient();
        try {
          const snippet = await snippetsClient.get({
            publicId: args.publicId,
          });

          // Check if the user owns the snippet or has permission to view it
          if (snippet.userId !== ctx.user.publicId) {
            throw new Error("You don't have permission to view this snippet");
          }

          // Format tags to match the GraphQL schema
          const formattedTags = (snippet.tags || []).map((tag) => ({
            id: String(tag.id),
            publicId: tag.publicId,
            name: tag.name,
            createdAt: tag.createdAt.toISOString(),
            updatedAt: tag.updatedAt.toISOString(),
          }));

          return {
            id: String(snippet.id),
            publicId: snippet.publicId,
            title: snippet.title,
            code: snippet.code,
            description: snippet.description,
            language: snippet.language,
            createdAt: snippet.createdAt.toISOString(),
            updatedAt: snippet.updatedAt.toISOString(),
            tags: formattedTags,
            user: ctx.user,
          };
        } catch (error) {
          console.error("Failed to get snippet:", error);
          throw new Error("Failed to get snippet");
        }
      },

      snippets: async (_, args, ctx) => {
        if (!ctx.user) {
          throw new Error("Authentication required");
        }

        const snippetsClient = getSnippetsClient();
        try {
          const result = await snippetsClient.getUserSnippets({
            userId: ctx.user.publicId,
          });

          return result.snippets.map((snippet) => {
            // Format tags to match the GraphQL schema
            const formattedTags = (snippet.tags || []).map((tag) => ({
              id: String(tag.id),
              publicId: tag.publicId,
              name: tag.name,
              createdAt: tag.createdAt.toISOString(),
              updatedAt: tag.updatedAt.toISOString(),
            }));

            return {
              id: String(snippet.id),
              publicId: snippet.publicId,
              title: snippet.title,
              code: snippet.code,
              description: snippet.description,
              language: snippet.language,
              createdAt: snippet.createdAt.toISOString(),
              updatedAt: snippet.updatedAt.toISOString(),
              tags: formattedTags,
              user: ctx.user,
            };
          });
        } catch (error) {
          console.error("Failed to get snippets:", error);
          throw new Error("Failed to get snippets");
        }
      },
    },

    // Resolver for the Snippet type
    Snippet: {
      // Resolver for the user field on the Snippet type
      user: async (parent, _, ctx) => {
        return ctx.user! || parent.user;
      },
      snippetTags: async (parent, _, ctx) => {
        const tagsClient = getTagsClient();
        const snippetTags = await tagsClient.listSnippetTags({
          snippetId: parent.publicId,
        });

        return snippetTags;
      },
    },
    SnippetTag: {
      tag: async (parent, _, ctx) => {
        const tagsClient = getTagsClient();
        const tag = await tagsClient.getTag({ publicId: parent.tagId });
        return tag;
      },
    },
  };
};
