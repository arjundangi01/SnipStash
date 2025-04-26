import { readFileSync } from "fs";

import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { sync as globSync } from "glob";
import { NextRequest } from "next/server";
import { createUserResolvers } from "./user";
import { getUsersClient, User } from "@/src/service/user";
import { Resolvers } from "@/src/gql/graphql";
import { GraphQLContext } from "./context";
import { getSession } from "@/src/app/api/graphql/session";
import { createSnippetResolvers } from "./snippet";
import { createTagResolvers } from "./tag";

const schemaPath = "./src/app/api/graphql/schema/**/*.graphql";
const typeDefs = globSync(schemaPath)
  .map((file) => readFileSync(file, { encoding: "utf-8" }))
  .join("\n");

const userResolvers = createUserResolvers();
const snippetResolvers = createSnippetResolvers();
const tagResolvers = createTagResolvers();

const server = new ApolloServer<Resolvers>({
  resolvers: [userResolvers, snippetResolvers, tagResolvers],
  typeDefs: typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req): Promise<GraphQLContext> => {
    const usersClient = getUsersClient();
    const session = await getSession();

    let user: User | null = null;

    if (session.userPublicId) {
      user = await usersClient.get({ publicId: session.userPublicId });
    }

    return { user };
  },
});

export { handler as GET, handler as POST };
