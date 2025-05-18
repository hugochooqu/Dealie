// app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY || "",
  server: process.env.MAILCHIMP_SERVER_PREFIX || "",
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body.email;

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID || "",
      {
        email_address: email,
        status: "subscribed",
      }
    );

    return NextResponse.json({ message: "Successfully subscribed", data: response }, { status: 201 });
  } catch (error: any) {
    console.error("Mailchimp error:", error)
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
