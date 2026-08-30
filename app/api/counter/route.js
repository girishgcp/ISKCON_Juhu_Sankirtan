import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
  const counter = await prisma.counter.upsert({
    where: { id: 'singleton' },
    update: {},
    create: { id: 'singleton' }
  });
  return Response.json({ next: counter.next });
}

export async function PUT(req) {
  const { next } = await req.json();

  if (typeof next !== 'number') {
    return Response.json({ message: 'next must be a number' }, { status: 400 });
  }

  const counter = await prisma.counter.upsert({
    where: { id: 'singleton' },
    update: { next },
    create: { id: 'singleton', next }
  });
  return Response.json(counter);
}
