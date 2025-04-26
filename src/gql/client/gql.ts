/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n      mutation createSnippet($input: CreateSnippet!) {\n        createSnippet(input: $input) {\n          publicId\n        }\n      }\n    ": typeof types.CreateSnippetDocument,
    "\n      query getSnippets($input: SnippetsInput!) {\n        snippets(input: $input) {\n          publicId\n          title\n          description\n          language\n          code\n          snippetTags {\n            tag {\n              publicId\n              name\n            }\n          }\n        }\n      }\n    ": typeof types.GetSnippetsDocument,
    "\n      query getSnippet($publicId: String!) {\n        snippet(publicId: $publicId) {\n          publicId\n          title\n          description\n          language\n          code\n          snippetTags {\n            tag {\n              publicId\n              name\n            }\n          }\n        }\n      }\n    ": typeof types.GetSnippetDocument,
    "\n      mutation updateSnippet($input: UpdateSnippet!) {\n        updateSnippet(input: $input) {\n          publicId\n        }\n      }\n    ": typeof types.UpdateSnippetDocument,
    "\n      mutation deleteSnippet($input: DeleteSnippet!) {\n        deleteSnippet(input: $input)\n      }\n    ": typeof types.DeleteSnippetDocument,
    "\n      query getTags {\n        tags {\n          publicId\n          name\n        }\n      }\n    ": typeof types.GetTagsDocument,
    "\n      mutation createUser($input: CreateUser!) {\n        createUser(input: $input) {\n          email\n        }\n      }\n    ": typeof types.CreateUserDocument,
    "\n      query me {\n        me {\n          email\n          name\n          publicId\n        }\n      }\n    ": typeof types.MeDocument,
};
const documents: Documents = {
    "\n      mutation createSnippet($input: CreateSnippet!) {\n        createSnippet(input: $input) {\n          publicId\n        }\n      }\n    ": types.CreateSnippetDocument,
    "\n      query getSnippets($input: SnippetsInput!) {\n        snippets(input: $input) {\n          publicId\n          title\n          description\n          language\n          code\n          snippetTags {\n            tag {\n              publicId\n              name\n            }\n          }\n        }\n      }\n    ": types.GetSnippetsDocument,
    "\n      query getSnippet($publicId: String!) {\n        snippet(publicId: $publicId) {\n          publicId\n          title\n          description\n          language\n          code\n          snippetTags {\n            tag {\n              publicId\n              name\n            }\n          }\n        }\n      }\n    ": types.GetSnippetDocument,
    "\n      mutation updateSnippet($input: UpdateSnippet!) {\n        updateSnippet(input: $input) {\n          publicId\n        }\n      }\n    ": types.UpdateSnippetDocument,
    "\n      mutation deleteSnippet($input: DeleteSnippet!) {\n        deleteSnippet(input: $input)\n      }\n    ": types.DeleteSnippetDocument,
    "\n      query getTags {\n        tags {\n          publicId\n          name\n        }\n      }\n    ": types.GetTagsDocument,
    "\n      mutation createUser($input: CreateUser!) {\n        createUser(input: $input) {\n          email\n        }\n      }\n    ": types.CreateUserDocument,
    "\n      query me {\n        me {\n          email\n          name\n          publicId\n        }\n      }\n    ": types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation createSnippet($input: CreateSnippet!) {\n        createSnippet(input: $input) {\n          publicId\n        }\n      }\n    "): (typeof documents)["\n      mutation createSnippet($input: CreateSnippet!) {\n        createSnippet(input: $input) {\n          publicId\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query getSnippets($input: SnippetsInput!) {\n        snippets(input: $input) {\n          publicId\n          title\n          description\n          language\n          code\n          snippetTags {\n            tag {\n              publicId\n              name\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query getSnippets($input: SnippetsInput!) {\n        snippets(input: $input) {\n          publicId\n          title\n          description\n          language\n          code\n          snippetTags {\n            tag {\n              publicId\n              name\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query getSnippet($publicId: String!) {\n        snippet(publicId: $publicId) {\n          publicId\n          title\n          description\n          language\n          code\n          snippetTags {\n            tag {\n              publicId\n              name\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query getSnippet($publicId: String!) {\n        snippet(publicId: $publicId) {\n          publicId\n          title\n          description\n          language\n          code\n          snippetTags {\n            tag {\n              publicId\n              name\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation updateSnippet($input: UpdateSnippet!) {\n        updateSnippet(input: $input) {\n          publicId\n        }\n      }\n    "): (typeof documents)["\n      mutation updateSnippet($input: UpdateSnippet!) {\n        updateSnippet(input: $input) {\n          publicId\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation deleteSnippet($input: DeleteSnippet!) {\n        deleteSnippet(input: $input)\n      }\n    "): (typeof documents)["\n      mutation deleteSnippet($input: DeleteSnippet!) {\n        deleteSnippet(input: $input)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query getTags {\n        tags {\n          publicId\n          name\n        }\n      }\n    "): (typeof documents)["\n      query getTags {\n        tags {\n          publicId\n          name\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation createUser($input: CreateUser!) {\n        createUser(input: $input) {\n          email\n        }\n      }\n    "): (typeof documents)["\n      mutation createUser($input: CreateUser!) {\n        createUser(input: $input) {\n          email\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query me {\n        me {\n          email\n          name\n          publicId\n        }\n      }\n    "): (typeof documents)["\n      query me {\n        me {\n          email\n          name\n          publicId\n        }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;