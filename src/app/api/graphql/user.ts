import { Resolvers } from "@/src/gql/graphql";
import { getUsersClient } from "@/src/service/user";

export const createUserResolvers = (): Resolvers => {
  return {
    Mutation: {
      createUser: async (_, args) => {
        const usersClient = getUsersClient();
        try {
          const result = await usersClient.create({
            email: args.input.email,
            name: args.input.name,
            password: args.input.password,
          });

          return result.user;
        } catch (error) {
          throw new Error("Failed to create user");
        }
      },
    },
    Query: {
      me: async (_, args, ctx) => {
        if (!ctx.user) {
          throw new Error("User not found");
        }
        return ctx.user;
      },
    },
  };
};
