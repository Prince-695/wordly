import "server-only";
import { cache } from "react";
import { auth } from "~/server/auth";

export const getServerSession = cache(async () => {
  return await auth();
});

export const getCurrentUser = cache(async () => {
  const session = await getServerSession();
  return session?.user;
});
