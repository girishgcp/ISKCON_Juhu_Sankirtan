import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

function currentFY() {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const year = now.getFullYear();
  return month >= 4 ? year : year - 1;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fy = searchParams.get('fy') || String(currentFY());

  const counter = await prisma.counter.upsert({
    where: { id: fy },
    update: {},
    create: { id: fy, next: 1 }
  });
  return Response.json({ fy, next: counter.next });
}

export async function PUT(req) {
  const { fy, next } = await req.json();

  if (!fy || typeof next !== 'number') {
    return Response.json({ message: 'fy (string) and next (number) are required' }, { status: 400 });
  }

  const counter = await prisma.counter.upsert({
    where: { id: String(fy) },
    update: { next },
    create: { id: String(fy), next }
  });
  return Response.json(counter);
}
