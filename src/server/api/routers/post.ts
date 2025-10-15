import { z } from "zod";
import { and, count, desc, eq, ilike, or, sql } from "drizzle-orm";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { categories, postCategories, posts } from "~/server/db/schema";

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Helper function to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Helper function to generate excerpt from content
function generateExcerpt(content: string, maxLength = 160): string {
  const plainText = content.replace(/[#*`\[\]()]/g, "").trim();
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + "...";
}

export const postRouter = createTRPCRouter({
  // Get all posts with filtering, search, and pagination
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(12),
        offset: z.number().min(0).default(0),
        categorySlug: z.string().optional(),
        search: z.string().optional(),
        published: z.boolean().optional(),
        sortBy: z.enum(["latest", "oldest"]).default("latest"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const conditions = [];

      // Filter by published status
      if (input.published !== undefined) {
        conditions.push(eq(posts.published, input.published));
      }

      // Filter by category
      if (input.categorySlug) {
        const category = await ctx.db.query.categories.findFirst({
          where: eq(categories.slug, input.categorySlug),
        });

        if (category) {
          const postsInCategory = await ctx.db
            .select({ postId: postCategories.postId })
            .from(postCategories)
            .where(eq(postCategories.categoryId, category.id));

          const postIds = postsInCategory.map((p) => p.postId);
          if (postIds.length > 0) {
            conditions.push(
              sql`${posts.id} IN ${sql.raw(`(${postIds.join(",")})`)}`,
            );
          } else {
            conditions.push(sql`false`);
          }
        }
      }

      // Search filter
      if (input.search) {
        conditions.push(
          or(
            ilike(posts.title, `%${input.search}%`),
            ilike(posts.content, `%${input.search}%`),
          )!,
        );
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      // Get total count
      const [totalResult] = await ctx.db
        .select({ count: count() })
        .from(posts)
        .where(whereClause);

      // Get posts with categories
      const postsData = await ctx.db.query.posts.findMany({
        where: whereClause,
        orderBy:
          input.sortBy === "latest" ? [desc(posts.createdAt)] : [posts.createdAt],
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

      // Calculate reading time for each post
      const postsWithMeta = postsData.map((post) => ({
        ...post,
        readingTime: calculateReadingTime(post.content),
        categories: post.postCategories.map((pc) => pc.category),
      }));

      return {
        posts: postsWithMeta,
        total: totalResult?.count ?? 0,
        hasMore: (input.offset + input.limit) < (totalResult?.count ?? 0),
      };
    }),

  // Get single post by slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.query.posts.findFirst({
        where: eq(posts.slug, input.slug),
        with: {
          postCategories: {
            with: {
              category: true,
            },
          },
        },
      });

      if (!post) {
        throw new Error("Post not found");
      }

      const wordCount = post.content.trim().split(/\s+/).length;
      const readingTime = calculateReadingTime(post.content);

      return {
        ...post,
        wordCount,
        readingTime,
        categories: post.postCategories.map((pc) => pc.category),
      };
    }),

  // Get related posts (same categories)
  getRelated: publicProcedure
    .input(z.object({ slug: z.string(), limit: z.number().default(3) }))
    .query(async ({ ctx, input }) => {
      const currentPost = await ctx.db.query.posts.findFirst({
        where: eq(posts.slug, input.slug),
        with: {
          postCategories: true,
        },
      });

      if (!currentPost) return [];

      const categoryIds = currentPost.postCategories.map((pc) => pc.categoryId);

      if (categoryIds.length === 0) return [];

      // Find posts with same categories
      const relatedPostIds = await ctx.db
        .select({ postId: postCategories.postId })
        .from(postCategories)
        .where(
          and(
            sql`${postCategories.categoryId} IN ${sql.raw(`(${categoryIds.join(",")})`)}`,
            sql`${postCategories.postId} != ${currentPost.id}`,
          ),
        )
        .groupBy(postCategories.postId)
        .limit(input.limit);

      const postIds = relatedPostIds.map((p) => p.postId);

      if (postIds.length === 0) return [];

      const relatedPosts = await ctx.db.query.posts.findMany({
        where: and(
          sql`${posts.id} IN ${sql.raw(`(${postIds.join(",")})`)}`,
          eq(posts.published, true),
        ),
        with: {
          postCategories: {
            with: {
              category: true,
            },
          },
        },
        limit: input.limit,
      });

      return relatedPosts.map((post) => ({
        ...post,
        readingTime: calculateReadingTime(post.content),
        categories: post.postCategories.map((pc) => pc.category),
      }));
    }),

  // Create new post
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        content: z.string().min(1),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        published: z.boolean().default(false),
        categoryIds: z.array(z.number()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const slug = input.slug ?? generateSlug(input.title);
      const excerpt = input.excerpt ?? generateExcerpt(input.content);

      // Check if slug already exists
      const existing = await ctx.db.query.posts.findFirst({
        where: eq(posts.slug, slug),
      });

      if (existing) {
        throw new Error("A post with this slug already exists");
      }

      const [newPost] = await ctx.db
        .insert(posts)
        .values({
          title: input.title,
          content: input.content,
          slug,
          excerpt,
          published: input.published,
          userId: parseInt(ctx.session.user.id!),
        })
        .returning();

      // Add category relationships
      if (input.categoryIds && input.categoryIds.length > 0 && newPost) {
        await ctx.db.insert(postCategories).values(
          input.categoryIds.map((categoryId) => ({
            postId: newPost.id,
            categoryId,
          })),
        );
      }

      return newPost;
    }),

  // Update existing post
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).max(255).optional(),
        content: z.string().min(1).optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        published: z.boolean().optional(),
        categoryIds: z.array(z.number()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, categoryIds, ...updateData } = input;

      // Verify ownership
      const existingPost = await ctx.db.query.posts.findFirst({
        where: eq(posts.id, id),
      });

      if (!existingPost) {
        throw new Error("Post not found");
      }

      if (existingPost.userId !== parseInt(ctx.session.user.id!)) {
        throw new Error("You don't have permission to edit this post");
      }

      // If slug is provided or title changed, check uniqueness
      if (updateData.slug) {
        const existing = await ctx.db.query.posts.findFirst({
          where: and(eq(posts.slug, updateData.slug), sql`${posts.id} != ${id}`),
        });

        if (existing) {
          throw new Error("A post with this slug already exists");
        }
      }

      // Update post
      const [updated] = await ctx.db
        .update(posts)
        .set(updateData)
        .where(eq(posts.id, id))
        .returning();

      // Update category relationships if provided
      if (categoryIds !== undefined) {
        // Delete existing relationships
        await ctx.db.delete(postCategories).where(eq(postCategories.postId, id));

        // Add new relationships
        if (categoryIds.length > 0) {
          await ctx.db.insert(postCategories).values(
            categoryIds.map((categoryId) => ({
              postId: id,
              categoryId,
            })),
          );
        }
      }

      return updated;
    }),

  // Delete post
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const post = await ctx.db.query.posts.findFirst({
        where: eq(posts.id, input.id),
      });

      if (!post) {
        throw new Error("Post not found");
      }

      if (post.userId !== parseInt(ctx.session.user.id!)) {
        throw new Error("You don't have permission to delete this post");
      }

      // Cascade delete will handle postCategories
      await ctx.db.delete(posts).where(eq(posts.id, input.id));
      return { success: true };
    }),

  // Toggle published status
  togglePublish: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.query.posts.findFirst({
        where: eq(posts.id, input.id),
      });

      if (!post) {
        throw new Error("Post not found");
      }

      if (post.userId !== parseInt(ctx.session.user.id!)) {
        throw new Error("You don't have permission to modify this post");
      }

      const [updated] = await ctx.db
        .update(posts)
        .set({ published: !post.published })
        .where(eq(posts.id, input.id))
        .returning();

      return updated;
    }),

  // Get drafts only
  getDrafts: publicProcedure.query(async ({ ctx }) => {
    const drafts = await ctx.db.query.posts.findMany({
      where: eq(posts.published, false),
      orderBy: [desc(posts.updatedAt)],
      with: {
        postCategories: {
          with: {
            category: true,
          },
        },
      },
    });

    return drafts.map((post) => ({
      ...post,
      categories: post.postCategories.map((pc) => pc.category),
    }));
  }),

  // Get stats
  getStats: publicProcedure.query(async ({ ctx }) => {
    const [totalPosts] = await ctx.db.select({ count: count() }).from(posts);
    const [publishedPosts] = await ctx.db
      .select({ count: count() })
      .from(posts)
      .where(eq(posts.published, true));
    const [draftPosts] = await ctx.db
      .select({ count: count() })
      .from(posts)
      .where(eq(posts.published, false));

    return {
      total: totalPosts?.count ?? 0,
      published: publishedPosts?.count ?? 0,
      drafts: draftPosts?.count ?? 0,
    };
  }),

  // Get current user's stats
  getMyStats: protectedProcedure.query(async ({ ctx }) => {
    const userId = parseInt(ctx.session.user.id!);
    
    const [totalPosts] = await ctx.db
      .select({ count: count() })
      .from(posts)
      .where(eq(posts.userId, userId));
    const [publishedPosts] = await ctx.db
      .select({ count: count() })
      .from(posts)
      .where(and(eq(posts.userId, userId), eq(posts.published, true)));
    const [draftPosts] = await ctx.db
      .select({ count: count() })
      .from(posts)
      .where(and(eq(posts.userId, userId), eq(posts.published, false)));

    return {
      total: totalPosts?.count ?? 0,
      published: publishedPosts?.count ?? 0,
      drafts: draftPosts?.count ?? 0,
    };
  }),

  // Get current user's posts
  getMyPosts: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(12),
        offset: z.number().min(0).default(0),
        published: z.boolean().optional(),
        sortBy: z.enum(["latest", "oldest"]).default("latest"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = parseInt(ctx.session.user.id!);
      const conditions = [eq(posts.userId, userId)];

      // Filter by published status
      if (input.published !== undefined) {
        conditions.push(eq(posts.published, input.published));
      }

      const whereClause = and(...conditions);

      // Get total count
      const [totalResult] = await ctx.db
        .select({ count: count() })
        .from(posts)
        .where(whereClause);

      // Get posts with categories
      const postsData = await ctx.db.query.posts.findMany({
        where: whereClause,
        orderBy:
          input.sortBy === "latest" ? [desc(posts.createdAt)] : [posts.createdAt],
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

      // Calculate reading time for each post
      const postsWithMeta = postsData.map((post) => ({
        ...post,
        readingTime: calculateReadingTime(post.content),
        categories: post.postCategories.map((pc) => pc.category),
      }));

      return {
        posts: postsWithMeta,
        total: totalResult?.count ?? 0,
        hasMore: (input.offset + input.limit) < (totalResult?.count ?? 0),
      };
    }),
});
