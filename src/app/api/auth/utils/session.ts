import { getUsersClient, User } from "@/src/service/user";
import { getSession } from "../../graphql/session";

export const setSession = async (user: User) => {
  const usersClient = getUsersClient();

  const session = await getSession();
  session.userPublicId = user.publicId.toString();
  session.userEmail = user.email;
  session.userFirstName = user.name ?? undefined;
  await session.save();
};
