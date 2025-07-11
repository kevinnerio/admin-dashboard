'use server';

import {insertCustomersSchema, clients, db} from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(formData: FormData) {
  // let id = Number(formData.get('id'));
  // await deleteProductById(id);
  // revalidatePath('/');
}

export async function deleteClients(formData: FormData) {
  //let id = Number(formData.get('id'));
  //await deleteProductById(id);
  //revalidatePath('/customers');
}

export async function insertCustomers(formData: FormData) {
  let data = Object.fromEntries(formData);

  data.createdAt = new Date();

  let parsedData = insertCustomersSchema.safeParse(data);
  console.log('Parsed Data:', parsedData);
  if (!parsedData.success) {
    console.error('Validation failed:', parsedData.error);
    return;
  }

  const cleanData = { ...parsedData.data };
  delete cleanData.id;

  await db.insert(clients).values({
    ...cleanData,
    status: cleanData.status ?? 'active', // Default if not provided
  });

  console.log('✅ Successfully inserted:', cleanData);
}