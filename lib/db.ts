import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      products: await db
        .select()
        .from(products)
        .where(ilike(products.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalProducts: 0
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  let totalProducts = await db.select({ count: count() }).from(products);
  let moreProducts = await db.select().from(products).limit(5).offset(offset);
  let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts: totalProducts[0].count
  };
}

export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  status: pgEnum('status', ['active', 'inactive', 'archived'])('status').notNull(),
  createdAt: timestamp('created_at').notNull(),
  email: text('email').notNull()
});

export type SelectCustomers = typeof customers.$inferSelect;

export const insertCustomersSchema = createInsertSchema(customers);

export async function deleteCustomerById(id: number) {
  await db.delete(customers).where(eq(customers.id, id));
}

export async function getCustomers(
  search: string,
  offset: number
): Promise<{
  customers: SelectCustomers[];
  newOffset: number | null;
  totalCustomers: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      customers: await db
        .select()
        .from(customers)
        .where(ilike(customers.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalCustomers: 0
    };
  }

  if (offset === null) {
    return { customers: [], newOffset: null, totalCustomers: 0 };
  }

  let totalCustomers = await db.select({ count: count() }).from(customers);
  let moreCustomers = await db.select().from(customers).limit(5).offset(offset);
  let newOffset = moreCustomers.length >= 5 ? offset + 5 : null;

  return {
    customers: moreCustomers,
    newOffset,
    totalCustomers: totalCustomers[0].count
  };
}