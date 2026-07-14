import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  real,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  emoji: text("emoji").notNull(),
  description: text("description").notNull().default(""),
  gradient: text("gradient").notNull().default("from-emerald-400 to-teal-500"),
  imageUrl: text("image_url"),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull().default(""),
  longDescription: text("long_description").notNull().default(""),
  priceCents: integer("price_cents").notNull(),
  compareAtCents: integer("compare_at_cents"),
  categorySlug: text("category_slug").notNull(),
  emoji: text("emoji").notNull(),
  gradient: text("gradient").notNull().default("from-emerald-100 to-teal-100"),
  unit: text("unit").notNull().default("each"),
  origin: text("origin").notNull().default(""),
  stock: integer("stock").notNull().default(100),
  rating: real("rating").notNull().default(4.5),
  reviewCount: integer("review_count").notNull().default(0),
  badge: text("badge"),
  featured: boolean("featured").notNull().default(false),
  organic: boolean("organic").notNull().default(false),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  imageUrl: text("image_url"),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productSlug: text("product_slug").notNull(),
  author: text("author").notNull(),
  rating: integer("rating").notNull(),
  title: text("title").notNull().default(""),
  body: text("body").notNull().default(""),
  verified: boolean("verified").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type OrderItem = {
  slug: string;
  name: string;
  emoji: string;
  priceCents: number;
  quantity: number;
  unit: string;
};

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  address: text("address").notNull(),
  city: text("city").notNull(),
  postalCode: text("postal_code").notNull(),
  deliveryNotes: text("delivery_notes").notNull().default(""),
  items: jsonb("items").$type<OrderItem[]>().notNull().default([]),
  subtotalCents: integer("subtotal_cents").notNull(),
  deliveryCents: integer("delivery_cents").notNull().default(0),
  totalCents: integer("total_cents").notNull(),
  status: text("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Order = typeof orders.$inferSelect;
