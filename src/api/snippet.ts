import { env } from "@/env.mjs";
import { graphql } from "@/src/gql/client";
import {
  CreateSnippet,
  DeleteSnippet,
  SnippetsInput,
  UpdateSnippet,
} from "@/src/gql/graphql";
import request from "graphql-request";

export class SnippetAPI {
  static GRAPHQL_URL = `${env.NEXT_PUBLIC_URL}/api/graphql`;

  static createSnippet = (input: CreateSnippet) => {
    const snippet = graphql(/* GraphQL */ `
      mutation createSnippet($input: CreateSnippet!) {
        createSnippet(input: $input) {
          publicId
        }
      }
    `);
    return request(this.GRAPHQL_URL, snippet, { input });
  };

  static getSnippets = (input: SnippetsInput) => {
    const snippets = graphql(/* GraphQL */ `
      query getSnippets($input: SnippetsInput!) {
        snippets(input: $input) {
          publicId
          title
          description
          language
          code
          snippetTags {
            tag {
              publicId
              name
            }
          }
        }
      }
    `);
    return request(this.GRAPHQL_URL, snippets, { input });
  };

  static getSnippet = (publicId: string) => {
    const snippet = graphql(/* GraphQL */ `
      query getSnippet($publicId: String!) {
        snippet(publicId: $publicId) {
          publicId
          title
          description
          language
          code
          snippetTags {
            tag {
              publicId
              name
            }
          }
        }
      }
    `);
    return request(this.GRAPHQL_URL, snippet, { publicId });
  };

  static updateSnippet = (input: UpdateSnippet) => {
    const snippet = graphql(/* GraphQL */ `
      mutation updateSnippet($input: UpdateSnippet!) {
        updateSnippet(input: $input) {
          publicId
        }
      }
    `);

    return request(this.GRAPHQL_URL, snippet, { input });
  };

  static deleteSnippet = (input: DeleteSnippet) => {
    const snippet = graphql(/* GraphQL */ `
      mutation deleteSnippet($input: DeleteSnippet!) {
        deleteSnippet(input: $input)
      }
    `);
    return request(this.GRAPHQL_URL, snippet, { input });
  };

  static getTags = () => {
    const tags = graphql(/* GraphQL */ `
      query getTags {
        tags {
          publicId
          name
        }
      }
    `);
    return request(this.GRAPHQL_URL, tags, {});
  };
}
