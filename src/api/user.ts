import { env } from "@/env.mjs";
import { graphql } from "@/src/gql/client";
import { CreateUser } from "@/src/gql/graphql";
import request from "graphql-request";

export class UserAPI {
  static GRAPHQL_URL = `/api/graphql`;

  static createUser = (input: CreateUser) => {
    const user = graphql(/* GraphQL */ `
      mutation createUser($input: CreateUser!) {
        createUser(input: $input) {
          email
        }
      }
    `);
    return request(this.GRAPHQL_URL, user, {
      input: {
        ...input,
      },
    });
  };

  static getMe = () => {
    const user = graphql(/* GraphQL */ `
      query me {
        me {
          email
          name
          publicId
        }
      }
    `);
    return request(this.GRAPHQL_URL, user);
  };
}
