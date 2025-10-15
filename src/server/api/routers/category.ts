import { z } from "zod";
import { and, count, desc, eq, sql } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { categories, postCategories, posts } from "~/server/db/schema";

// Helper function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const categoryRouter = createTRPCRouter({
  // Get all categories with post counts
  getAll: publicProcedure.query(async ({ ctx }) => {
    const allCategories = await ctx.db.query.categories.findMany({
      orderBy: [categories.name],
    });

    // Get post counts for each category
    const categoriesWithCounts = await Promise.all(
      allCategories.map(async (category) => {
        const [postCount] = await ctx.db
          .select({ count: count() })
          .from(postCategories)
          .where(eq(postCategories.categoryId, category.id));

        return {
          ...category,
          postCount: postCount?.count ?? 0,
        };
      }),
    );

    return categoriesWithCounts;
  }),

  // Get single category by slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const category = await ctx.db.query.categories.findFirst({
        where: eq(categories.slug, input.slug),
      });

      if (!category) {
        throw new Error("Category not found");
      }

      return category;
    }),

  // Get category with posts
  getWithPosts: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        limit: z.number().min(1).max(100).default(12),
        offset: z.number().min(0).default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      const category = await ctx.db.query.categories.findFirst({
        where: eq(categories.slug, input.slug),
      });

      if (!category) {
        throw new Error("Category not found");
      }

      // Get post IDs for this category
      const postIds = await ctx.db
        .select({ postId: postCategories.postId })
        .from(postCategories)
        .where(eq(postCategories.categoryId, category.id));

      const postIdList = postIds.map((p) => p.postId);

      if (postIdList.length === 0) {
        return {
          category,
          posts: [],
          total: 0,
        };
      }

      // Get total count
      const [totalResult] = await ctx.db
        .select({ count: count() })
        .from(posts)
        .where(
          and(
            sql`${posts.id} IN ${sql.raw(`(${postIdList.join(",")})`)}`,
            eq(posts.published, true),
          ),
        );

      // Get posts
      const categoryPosts = await ctx.db.query.posts.findMany({
        where: and(
          sql`${posts.id} IN ${sql.raw(`(${postIdList.join(",")})`)}`,
          eq(posts.published, true),
        ),
        orderBy: [desc(posts.createdAt)],
        limit: input.limit,
        offset: input.offset,
        with: {
          postCategories: {
            with: {
              category: true,
            },
          },
        },
      });

      return {
        category,
        posts: categoryPosts.map((post) => ({
          ...post,
          categories: post.postCategories.map((pc) => pc.category),
        })),
        total: totalResult?.count ?? 0,
      };
    }),

  // Create new category
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        slug: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const slug = input.slug ?? generateSlug(input.name);

      // Check if slug already exists
      const existing = await ctx.db.query.categories.findFirst({
        where: eq(categories.slug, slug),
      });

      if (existing) {
        throw new Error("A category with this slug already exists");
      }

      const [newCategory] = await ctx.db
        .insert(categories)
        .values({
          name: input.name,
          slug,
          description: input.description,
        })
        .returning();

      return newCategory;
    }),

  // Update existing category
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).max(100).optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      // If slug is provided, check uniqueness
      if (updateData.slug) {
        const existing = await ctx.db.query.categories.findFirst({
          where: and(
            eq(categories.slug, updateData.slug),
            sql`${categories.id} != ${id}`,
          ),
        });

        if (existing) {
          throw new Error("A category with this slug already exists");
        }
      }

      const [updated] = await ctx.db
        .update(categories)
        .set(updateData)
        .where(eq(categories.id, id))
        .returning();

      return updated;
    }),

  // Delete category
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Check if category has posts
      const [postCount] = await ctx.db
        .select({ count: count() })
        .from(postCategories)
        .where(eq(postCategories.categoryId, input.id));

      if ((postCount?.count ?? 0) > 0) {
        throw new Error(
          "Cannot delete category with existing posts. Remove posts from this category first.",
        );
      }

      // Delete category (cascade will handle postCategories)
      await ctx.db.delete(categories).where(eq(categories.id, input.id));
      return { success: true };
    }),

  // Get popular categories (by post count)
  getPopular: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(20).default(5) }))
    .query(async ({ ctx, input }) => {
      const allCategories = await ctx.db.query.categories.findMany();

      const categoriesWithCounts = await Promise.all(
        allCategories.map(async (category) => {
          const [postCount] = await ctx.db
            .select({ count: count() })
            .from(postCategories)
            .innerJoin(posts, eq(postCategories.postId, posts.id))
            .where(
              and(
                eq(postCategories.categoryId, category.id),
                eq(posts.published, true),
              ),
            );

          return {
            ...category,
            postCount: postCount?.count ?? 0,
          };
        }),
      );

      // Sort by post count and limit
      return categoriesWithCounts
        .sort((a, b) => b.postCount - a.postCount)
        .slice(0, input.limit);
    }),

  // Get stats
  getStats: publicProcedure.query(async ({ ctx }) => {
    const [totalCategories] = await ctx.db
      .select({ count: count() })
      .from(categories);

    return {
      total: totalCategories?.count ?? 0,
    };
  }),
});
