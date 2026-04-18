import { pgTable , text , timestamp , uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    createdAt: timestamp("created_at", {mode : "date"}).defaultNow(),
    updatedAt: timestamp("updated_at", {mode : "date"}).defaultNow(),
}); 

export const products = pgTable("products", {
    id: uuid("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at", {mode : "date"}).defaultNow(),
    updatedAt: timestamp("updated_at", {mode : "date"}).defaultNow(),
    userId: text("user_id").notNull().references(() => users.id , { onDelete: "cascade" }),
});

export const comments = pgTable("comments", {
    id: uuid("id").defaultRandom().primaryKey(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", {mode : "date"}).defaultNow(),
    updatedAt: timestamp("updated_at", {mode : "date"}).defaultNow(),
    userId: text("user_id").notNull().references(() => users.id , { onDelete: "cascade" }),
    productId: uuid("product_id").notNull().references(() => products.id , { onDelete: "cascade" }),
});

// 🔴 Relations define how tables connect to each other. This enables Drizzle's query API
// 🔴 to automatically join related data when using `with: { relationName: true }`

// 🔴 Users Relations: A user can have many products and many comments
// 🔴 `many()` means one user can have multiple related records

export const usersRelations = relations(users, ({ many }) => ({
  products: many(products), // 🔴 One user → many products
  comments: many(comments), // 🔴 One user → many comments
}));

// Products Relations: a product belongs to one user and can have many comments
// `one()` means a single related record, `many()` means multiple related records

export const productsRelations = relations(products, ({ one, many }) => ({
  comments: many(comments),
  // `fields` = the foreign key column in THIS table (products.userId)
  // `references` = the primary key column in the RELATED table (users.id)
  user: one(users, { fields: [products.userId], references: [users.id] }), // one product → one user
}));

// Comments Relations: A comment belongs to one user and one product
export const commentsRelations = relations(comments, ({ one }) => ({
  // `comments.userId` is the foreign key,  `users.id` is the primary key
  user: one(users, { fields: [comments.userId], references: [users.id] }), // One comment → one user
  // `comments.productId` is the foreign key,  `products.id` is the primary key
  product: one(products, { fields: [comments.productId], references: [products.id] }), // One comment → one product
}));

// Type inference
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
