 import { db, customers } from 'lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  await db.insert(customers).values([
    {
      id: 1,
      name: 'Sam Altman',
      status: 'active',
      createdAt: new Date(), 
      email: 'sam@email.com',
    },
    {
      id: 2,
      name: 'Samuel Altman',
      status: 'active',
      createdAt: new Date(), 
      email: 'samuel@email.com',
    },
    {
      id: 3,  
      name: 'Samantha Altman',
      status: 'active',
      createdAt: new Date(),
      email: 'samantha@email.com'
    },
    {
      id: 4,
      name: 'Sami Altman',
      status: 'active',
      createdAt: new Date(),
      email: 'sami@email.com'
    },
    {
      id: 5,
      name: 'River Altman',
      status: 'active',
      createdAt: new Date(),
      email: 'river@email.com'
    },
    {
      id: 6,
      name: 'Alex Altman',
      status: 'active',
      createdAt: new Date(),
      email: 'alex@email.com'
    },
    {
      id: 7,
      name: 'Jordan Rickman',
      status: 'active',
      createdAt: new Date(),
      email: 'jrickman@email.com'
    }
  ]);

  return Response.json({
    message: 'Seeded customers successfully.'
  });
}
