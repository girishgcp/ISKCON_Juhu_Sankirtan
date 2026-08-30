export const dynamic = 'force-dynamic';

export async function POST(req) {
  const { pin } = await req.json();
  const expected = process.env.ACCESS_PIN;

  if (!expected) {
    return Response.json(
      { ok: false, message: 'ACCESS_PIN is not set on the server yet.' },
      { status: 500 }
    );
  }

  if (pin === expected) {
    const res = Response.json({ ok: true });
    res.headers.append(
      'Set-Cookie',
      `iskcon_pin_ok=true; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`
    );
    return res;
  }

  return Response.json({ ok: false, message: 'Incorrect PIN' }, { status: 401 });
}
