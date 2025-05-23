import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY || "",},
    body: JSON.stringify({
        email,
        listIds: [3],
        updateEnabled: true}),
    })

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { isSuccess: false, data, error: data.message || 'Failed to subscribe' },
        { status: res.status }
      );
    }

    return NextResponse.json({ isSuccess: true, data, message: 'Successfully subscribed' }, { status: 201 });
  } catch (error: any) {
    console.error('Brevo error:', error);
    return NextResponse.json(
      { isSuccess: false, data: error, error: error.message || 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
