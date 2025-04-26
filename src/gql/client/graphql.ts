/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateSnippet = {
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  language: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateUser = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type DeleteSnippet = {
  publicId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSnippet: Snippet;
  createUser: User;
  deleteSnippet: Scalars['Boolean']['output'];
  updateSnippet: Snippet;
};


export type MutationCreateSnippetArgs = {
  input: CreateSnippet;
};


export type MutationCreateUserArgs = {
  input: CreateUser;
};


export type MutationDeleteSnippetArgs = {
  input: DeleteSnippet;
};


export type MutationUpdateSnippetArgs = {
  input: UpdateSnippet;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  snippet: Snippet;
  snippets: Array<Snippet>;
  user: User;
};


export type QuerySnippetArgs = {
  publicId: Scalars['String']['input'];
};


export type QuerySnippetsArgs = {
  input: SnippetsInput;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Snippet = {
  __typename?: 'Snippet';
  code: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  language: Scalars['String']['output'];
  publicId: Scalars['String']['output'];
  snippetTags?: Maybe<Array<SnippetTag>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type SnippetTag = {
  __typename?: 'SnippetTag';
  snippet?: Maybe<Snippet>;
  snippetId: Scalars['String']['output'];
  tag?: Maybe<Tag>;
  tagId: Scalars['String']['output'];
};

export type SnippetsInput = {
  languages?: InputMaybe<Array<Scalars['String']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Tag = {
  __typename?: 'Tag';
  name: Scalars['String']['output'];
  publicId: Scalars['String']['output'];
};

export type UpdateSnippet = {
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  publicId: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  publicId: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CreateSnippetMutationVariables = Exact<{
  input: CreateSnippet;
}>;


export type CreateSnippetMutation = { __typename?: 'Mutation', createSnippet: { __typename?: 'Snippet', publicId: string } };

export type GetSnippetsQueryVariables = Exact<{
  input: SnippetsInput;
}>;


export type GetSnippetsQuery = { __typename?: 'Query', snippets: Array<{ __typename?: 'Snippet', publicId: string, title: string, description?: string | null, language: string, code: string, snippetTags?: Array<{ __typename?: 'SnippetTag', tag?: { __typename?: 'Tag', publicId: string, name: string } | null }> | null }> };

export type GetSnippetQueryVariables = Exact<{
  publicId: Scalars['String']['input'];
}>;


export type GetSnippetQuery = { __typename?: 'Query', snippet: { __typename?: 'Snippet', publicId: string, title: string, description?: string | null, language: string, code: string, snippetTags?: Array<{ __typename?: 'SnippetTag', tag?: { __typename?: 'Tag', publicId: string, name: string } | null }> | null } };

export type UpdateSnippetMutationVariables = Exact<{
  input: UpdateSnippet;
}>;


export type UpdateSnippetMutation = { __typename?: 'Mutation', updateSnippet: { __typename?: 'Snippet', publicId: string } };

export type DeleteSnippetMutationVariables = Exact<{
  input: DeleteSnippet;
}>;


export type DeleteSnippetMutation = { __typename?: 'Mutation', deleteSnippet: boolean };

export type CreateUserMutationVariables = Exact<{
  input: CreateUser;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', email: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', email: string, name: string, publicId: string } };


export const CreateSnippetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSnippet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSnippet"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSnippet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicId"}}]}}]}}]} as unknown as DocumentNode<CreateSnippetMutation, CreateSnippetMutationVariables>;
export const GetSnippetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSnippets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SnippetsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"snippets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"snippetTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSnippetsQuery, GetSnippetsQueryVariables>;
export const GetSnippetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSnippet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"snippet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"publicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"snippetTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSnippetQuery, GetSnippetQueryVariables>;
export const UpdateSnippetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSnippet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSnippet"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSnippet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicId"}}]}}]}}]} as unknown as DocumentNode<UpdateSnippetMutation, UpdateSnippetMutationVariables>;
export const DeleteSnippetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteSnippet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteSnippet"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSnippet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteSnippetMutation, DeleteSnippetMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUser"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;