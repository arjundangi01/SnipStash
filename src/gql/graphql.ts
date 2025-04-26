import { GraphQLResolveInfo } from "graphql";
import { User as UserModel } from "@/src/service/user";
import { GraphQLContext } from "@/src/app/api/graphql/context";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type CreateSnippet = {
  code: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  language: Scalars["String"]["input"];
  tags: Array<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type CreateUser = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type DeleteSnippet = {
  publicId: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createSnippet: Snippet;
  createUser: User;
  deleteSnippet: Scalars["Boolean"]["output"];
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
  __typename?: "Query";
  me: User;
  snippet: Snippet;
  snippets: Array<Snippet>;
  tags: Array<Tag>;
  user: User;
};

export type QuerySnippetArgs = {
  publicId: Scalars["String"]["input"];
};

export type QuerySnippetsArgs = {
  input: SnippetsInput;
};

export type QueryUserArgs = {
  id: Scalars["ID"]["input"];
};

export type Snippet = {
  __typename?: "Snippet";
  code: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  language: Scalars["String"]["output"];
  publicId: Scalars["String"]["output"];
  snippetTags?: Maybe<Array<SnippetTag>>;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
  user?: Maybe<User>;
};

export type SnippetTag = {
  __typename?: "SnippetTag";
  snippet?: Maybe<Snippet>;
  snippetId: Scalars["String"]["output"];
  tag?: Maybe<Tag>;
  tagId: Scalars["String"]["output"];
};

export type SnippetsInput = {
  languages?: InputMaybe<Array<Scalars["String"]["input"]>>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  tagIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type Tag = {
  __typename?: "Tag";
  name: Scalars["String"]["output"];
  publicId: Scalars["String"]["output"];
};

export type UpdateSnippet = {
  code?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  language?: InputMaybe<Scalars["String"]["input"]>;
  publicId: Scalars["String"]["input"];
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  publicId: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  CreateSnippet: CreateSnippet;
  CreateUser: CreateUser;
  DeleteSnippet: DeleteSnippet;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Snippet: ResolverTypeWrapper<
    Omit<Snippet, "snippetTags" | "user"> & {
      snippetTags?: Maybe<Array<ResolversTypes["SnippetTag"]>>;
      user?: Maybe<ResolversTypes["User"]>;
    }
  >;
  SnippetTag: ResolverTypeWrapper<
    Omit<SnippetTag, "snippet"> & { snippet?: Maybe<ResolversTypes["Snippet"]> }
  >;
  SnippetsInput: SnippetsInput;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Tag: ResolverTypeWrapper<Tag>;
  UpdateSnippet: UpdateSnippet;
  User: ResolverTypeWrapper<UserModel>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"]["output"];
  CreateSnippet: CreateSnippet;
  CreateUser: CreateUser;
  DeleteSnippet: DeleteSnippet;
  ID: Scalars["ID"]["output"];
  Mutation: {};
  Query: {};
  Snippet: Omit<Snippet, "snippetTags" | "user"> & {
    snippetTags?: Maybe<Array<ResolversParentTypes["SnippetTag"]>>;
    user?: Maybe<ResolversParentTypes["User"]>;
  };
  SnippetTag: Omit<SnippetTag, "snippet"> & {
    snippet?: Maybe<ResolversParentTypes["Snippet"]>;
  };
  SnippetsInput: SnippetsInput;
  String: Scalars["String"]["output"];
  Tag: Tag;
  UpdateSnippet: UpdateSnippet;
  User: UserModel;
};

export type MutationResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createSnippet?: Resolver<
    ResolversTypes["Snippet"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateSnippetArgs, "input">
  >;
  createUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, "input">
  >;
  deleteSnippet?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteSnippetArgs, "input">
  >;
  updateSnippet?: Resolver<
    ResolversTypes["Snippet"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSnippetArgs, "input">
  >;
};

export type QueryResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  me?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  snippet?: Resolver<
    ResolversTypes["Snippet"],
    ParentType,
    ContextType,
    RequireFields<QuerySnippetArgs, "publicId">
  >;
  snippets?: Resolver<
    Array<ResolversTypes["Snippet"]>,
    ParentType,
    ContextType,
    RequireFields<QuerySnippetsArgs, "input">
  >;
  tags?: Resolver<Array<ResolversTypes["Tag"]>, ParentType, ContextType>;
  user?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "id">
  >;
};

export type SnippetResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes["Snippet"] = ResolversParentTypes["Snippet"]
> = {
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  language?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  publicId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  snippetTags?: Resolver<
    Maybe<Array<ResolversTypes["SnippetTag"]>>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SnippetTagResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes["SnippetTag"] = ResolversParentTypes["SnippetTag"]
> = {
  snippet?: Resolver<Maybe<ResolversTypes["Snippet"]>, ParentType, ContextType>;
  snippetId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes["Tag"]>, ParentType, ContextType>;
  tagId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes["Tag"] = ResolversParentTypes["Tag"]
> = {
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  publicId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  publicId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Snippet?: SnippetResolvers<ContextType>;
  SnippetTag?: SnippetTagResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type CreateSnippetMutation_createSnippet_Snippet = {
  __typename?: "Snippet";
  publicId: string;
};

export type CreateSnippetMutation_Mutation = {
  __typename?: "Mutation";
  createSnippet: CreateSnippetMutation_createSnippet_Snippet;
};

export type CreateSnippetMutationVariables = Exact<{
  input: CreateSnippet;
}>;

export type CreateSnippetMutation = CreateSnippetMutation_Mutation;

export type GetSnippetsQuery_snippets_Snippet_snippetTags_SnippetTag_tag_Tag = {
  __typename?: "Tag";
  publicId: string;
  name: string;
};

export type GetSnippetsQuery_snippets_Snippet_snippetTags_SnippetTag = {
  __typename?: "SnippetTag";
  tag?: GetSnippetsQuery_snippets_Snippet_snippetTags_SnippetTag_tag_Tag | null;
};

export type GetSnippetsQuery_snippets_Snippet = {
  __typename?: "Snippet";
  publicId: string;
  title: string;
  description?: string | null;
  language: string;
  code: string;
  snippetTags?: Array<GetSnippetsQuery_snippets_Snippet_snippetTags_SnippetTag> | null;
};

export type GetSnippetsQuery_Query = {
  __typename?: "Query";
  snippets: Array<GetSnippetsQuery_snippets_Snippet>;
};

export type GetSnippetsQueryVariables = Exact<{
  input: SnippetsInput;
}>;

export type GetSnippetsQuery = GetSnippetsQuery_Query;

export type GetSnippetQuery_snippet_Snippet_snippetTags_SnippetTag_tag_Tag = {
  __typename?: "Tag";
  publicId: string;
  name: string;
};

export type GetSnippetQuery_snippet_Snippet_snippetTags_SnippetTag = {
  __typename?: "SnippetTag";
  tag?: GetSnippetQuery_snippet_Snippet_snippetTags_SnippetTag_tag_Tag | null;
};

export type GetSnippetQuery_snippet_Snippet = {
  __typename?: "Snippet";
  publicId: string;
  title: string;
  description?: string | null;
  language: string;
  code: string;
  snippetTags?: Array<GetSnippetQuery_snippet_Snippet_snippetTags_SnippetTag> | null;
};

export type GetSnippetQuery_Query = {
  __typename?: "Query";
  snippet: GetSnippetQuery_snippet_Snippet;
};

export type GetSnippetQueryVariables = Exact<{
  publicId: Scalars["String"]["input"];
}>;

export type GetSnippetQuery = GetSnippetQuery_Query;

export type UpdateSnippetMutation_updateSnippet_Snippet = {
  __typename?: "Snippet";
  publicId: string;
};

export type UpdateSnippetMutation_Mutation = {
  __typename?: "Mutation";
  updateSnippet: UpdateSnippetMutation_updateSnippet_Snippet;
};

export type UpdateSnippetMutationVariables = Exact<{
  input: UpdateSnippet;
}>;

export type UpdateSnippetMutation = UpdateSnippetMutation_Mutation;

export type DeleteSnippetMutation_Mutation = {
  __typename?: "Mutation";
  deleteSnippet: boolean;
};

export type DeleteSnippetMutationVariables = Exact<{
  input: DeleteSnippet;
}>;

export type DeleteSnippetMutation = DeleteSnippetMutation_Mutation;

export type GetTagsQuery_tags_Tag = {
  __typename?: "Tag";
  publicId: string;
  name: string;
};

export type GetTagsQuery_Query = {
  __typename?: "Query";
  tags: Array<GetTagsQuery_tags_Tag>;
};

export type GetTagsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTagsQuery = GetTagsQuery_Query;

export type CreateUserMutation_createUser_User = {
  __typename?: "User";
  email: string;
};

export type CreateUserMutation_Mutation = {
  __typename?: "Mutation";
  createUser: CreateUserMutation_createUser_User;
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUser;
}>;

export type CreateUserMutation = CreateUserMutation_Mutation;

export type MeQuery_me_User = {
  __typename?: "User";
  email: string;
  name: string;
  publicId: string;
};

export type MeQuery_Query = { __typename?: "Query"; me: MeQuery_me_User };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = MeQuery_Query;
