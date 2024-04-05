import { auth } from "@/auth";
import { getUserByEmail } from "@/functions/user";

export const currentUser = async () => {
  const session = await auth();

  const existingUser = await getUserByEmail(session?.user?.email as string);
  if (existingUser) {
    return existingUser;
  }
  return "Unable to get User";
};
