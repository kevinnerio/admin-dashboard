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
  address: text('address').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  availableAt: timestamp('available_at').notNull(), 
  notes: text('notes').default(''),
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
        .where(ilike(products.address, `%${search}%`))
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

//Clients

// Clients table definition
export const clients = pgTable('customers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  status: pgEnum('status', ['active', 'inactive', 'archived'])('status').notNull(),
  createdAt: timestamp('created_at').notNull(),
  email: text('email').notNull()
});

// Type for selecting customers
export type SelectClients = typeof clients.$inferSelect;

export const insertCustomersSchema = createInsertSchema(clients);

export async function deleteClientById(id: number) {
  await db.delete(clients).where(eq(clients.id, id));
}

// Function to get customers with search and pagination
export async function getClients(
  search: string,
  offset: number
): Promise<{
  clients: SelectClients[];
  clientsOffset: number | null;
  totalClients: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      clients: await db
        .select()
        .from(clients)
        .where(ilike(clients.name, `%${search}%`))
        .limit(1000),
      clientsOffset: null,
      totalClients: 0
    };
  }

  if (offset === null) {
    return { clients: [], clientsOffset: null, totalClients: 0 };
  }

  let totalClients = await db.select({ count: count() }).from(clients);
  let moreClients = await db.select().from(clients).limit(5).offset(offset);
  let clientsOffset = moreClients.length >= 5 ? offset + 5 : null;

  return {
    clients: moreClients,
    clientsOffset,
    totalClients: totalClients[0].count
  };
}