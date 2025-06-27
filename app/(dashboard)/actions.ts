'use server';

import { deleteProductById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(formData: FormData) {
  // let id = Number(formData.get('id'));
  // await deleteProductById(id);
  // revalidatePath('/');
}

export async function deleteCustomers(formData: FormData) {
  //let id = Number(formData.get('id'));
  //await deleteProductById(id);
  //revalidatePath('/customers');
}