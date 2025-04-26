import { User } from "@/src/service/user";

export interface GraphQLContext {
  user: User | null;
}
