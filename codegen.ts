import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  documents: ["./src/api/*.ts"],
  generates: {
    "src/gql/client/": {
      preset: "client",
      config: {
        namingConvention: {
          enumValues: "change-case-all#upperCase",
        },
      },
    },
    "src/gql/graphql.ts": {
      config: {
        contextType: "./src/app/api/graphql/context#GraphQLContext",
        extractAllFieldsToTypes: true,
        mapperTypeSuffix: "Model",
        mappers: {
          User: "./service/user#User",
        },
        namingConvention: {
          enumValues: "change-case-all#upperCase",
        },
        showUnusedMappers: true,
      },
      plugins: ["typescript", "typescript-resolvers", "typescript-operations"],
    },
  },
  ignoreNoDocuments: true,
  overwrite: true,
  schema: "./src/app/api/graphql/schema/*.graphql",
};

export default config;
