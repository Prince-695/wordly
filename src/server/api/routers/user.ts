import { z } from "zod";
import bcrypt from "bcryptjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        username: z.string().min(3).max(50),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if username already exists
      const existingUser = await ctx.db.query.users.findFirst({
        where: eq(users.username, input.username),
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already taken",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(input.password, 10);

      // Create user
      const [newUser] = await ctx.db
        .insert(users)
        .values({
          username: input.username,
          password: hashedPassword,
        })
        .returning();

      return {
        id: newUser!.id,
        username: newUser!.username,
      };
    }),
});
