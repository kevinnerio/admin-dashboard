 import { db, products } from 'lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  await db.insert(products).values([
    {
      id: 1,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/smartphone-gaPvyZW6aww0IhD3dOpaU6gBGILtcJ.webp',
      address: '1234 Road Ave',
      status: 'active',
      price: '999.00',
      availableAt: new Date()
    },
    {
      id: 2,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/earbuds-3rew4JGdIK81KNlR8Edr8NBBhFTOtX.webp',
      address: '1234 Road Ave',
      status: 'active',
      price: '199.00',
      availableAt: new Date()
    },
    {
      id: 3,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/home-iTeNnmKSMnrykOS9IYyJvnLFgap7Vw.webp',
      address: '1234 Road Ave',
      status: 'active',
      price: '149.00',
      availableAt: new Date()
    },
    {
      id: 4,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/tv-H4l26crxtm9EQHLWc0ddrsXZ0V0Ofw.webp',
      address: '1234 Road Ave',
      status: 'active',
      price: '799.00',
      availableAt: new Date()
    },
    {
      id: 5,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/laptop-9bgUhjY491hkxiMDeSgqb9R5I3lHNL.webp',
      address: '1234 Road Ave',
      status: 'active',
      price: '1299.00',
      availableAt: new Date()
    },
    {
      id: 6,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/headset-lYnRnpjDbZkB78lS7nnqEJFYFAUDg6.webp',
      address:  '1234 Road Ave',
      status: 'active',
      price: '349.00',
      availableAt: new Date()
    },
    {
      id: 7,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/watch-S2VeARK6sEM9QFg4yNQNjHFaHc3sXv.webp',
      address: '1234 Road Ave',
      status: 'active',
      price: '249.00',
      availableAt: new Date()
    },
    {
      id: 8,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/speaker-4Zk0Ctx5AvxnwNNTFWVK4Gtpru4YEf.webp',
      address: '1234 Road Ave',
      status: 'active',
      price: '99.00',
      availableAt: new Date()
    },
    {
      id: 9,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/charger-GzRr0NSkCj0ZYWkTMvxXGZQu47w9r5.webp',
      address: '1234 Road Ave',
      status: 'active',
      price: '59.00',
      availableAt: new Date()
    },
    {
      id: 10,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/thermostat-8GnK2LDE3lZAjUVtiBk61RrSuqSTF7.webp',
      address: '1234 Road Ave',
      status: 'active',
      price: '199.00',
      availableAt: new Date()
    }
  ]);

  return Response.json({
    message: 'Seeded products successfully.'
  });
}
