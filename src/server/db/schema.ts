// Database schema for Wordly blogging platform
import { relations, sql } from "drizzle-orm";
import { index, integer, pgTableCreator, text, timestamp, varchar, boolean, primaryKey } from "drizzle-orm/pg-core";

/**
 * Multi-project schema feature of Drizzle ORM
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `wordly_${name}`);

// Users Table
export const users = createTable(
  "user",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    username: d.varchar({ length: 50 }).notNull().unique(),
    password: d.varchar({ length: 255 }).notNull(), // Hashed password
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [index("user_username_idx").on(t.username)],
);

// Posts Table
export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    title: d.varchar({ length: 255 }).notNull(),
    content: d.text().notNull(),
    slug: d.varchar({ length: 255 }).notNull().unique(),
    excerpt: d.text(),
    published: d.boolean().default(false).notNull(),
    userId: d.integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("post_slug_idx").on(t.slug),
    index("post_published_idx").on(t.published),
    index("post_created_at_idx").on(t.createdAt),
    index("post_user_idx").on(t.userId),
  ],
);

// Categories Table
export const categories = createTable(
  "category",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 100 }).notNull().unique(),
    slug: d.varchar({ length: 100 }).notNull().unique(),
    description: d.text(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [index("category_slug_idx").on(t.slug)],
);

// Post-Category Junction Table (Many-to-Many)
export const postCategories = createTable(
  "post_category",
  (d) => ({
    postId: d.integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
    categoryId: d.integer("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [
    primaryKey({ columns: [t.postId, t.categoryId] }),
    index("post_category_post_idx").on(t.postId),
    index("post_category_category_idx").on(t.categoryId),
  ],
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ many, one }) => ({
  postCategories: many(postCategories),
  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  postCategories: many(postCategories),
}));

export const postCategoriesRelations = relations(postCategories, ({ one }) => ({
  post: one(posts, {
    fields: [postCategories.postId],
    references: [posts.id],
  }),
  category: one(categories, {
    fields: [postCategories.categoryId],
    references: [categories.id],
  }),
}));
