import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
  const receipts = await prisma.receipt.findMany({
    orderBy: { savedAt: 'desc' }
  });
  return Response.json(receipts);
}

export async function POST(req) {
  const data = await req.json();

  if (!data.receiptNo) {
    return Response.json({ message: 'receiptNo is required' }, { status: 400 });
  }

  try {
    const receipt = await prisma.receipt.upsert({
      where: { receiptNo: String(data.receiptNo) },
      update: {
        date: data.date || '',
        from: data.from || '',
        issuedBy: data.issuedBy || null,
        amount: data.amount || 0,
        purpose: data.purpose || null,
        mode: data.mode || 'Cash',
        billNo: data.billNo || null,
        chequeNo: data.chequeNo || null,
        bank: data.bank || null,
        branch: data.branch || null,
        chequeDate: data.chequeDate || null
      },
      create: {
        receiptNo: String(data.receiptNo),
        date: data.date || '',
        from: data.from || '',
        issuedBy: data.issuedBy || null,
        amount: data.amount || 0,
        purpose: data.purpose || null,
        mode: data.mode || 'Cash',
        billNo: data.billNo || null,
        chequeNo: data.chequeNo || null,
        bank: data.bank || null,
        branch: data.branch || null,
        chequeDate: data.chequeDate || null
      }
    });
    return Response.json(receipt);
  } catch (e) {
    return Response.json({ message: e.message }, { status: 500 });
  }
}
