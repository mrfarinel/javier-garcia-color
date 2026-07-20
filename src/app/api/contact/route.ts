import { NextResponse } from "next/server";

const contactEmail = process.env.CONTACT_TO_EMAIL ?? "mrfarinel@gmail.com";
const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "Javier García Portfolio <onboarding@resend.dev>";

type ContactRequest = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Email service is not configured yet." }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as ContactRequest | null;

  const name = body?.name?.trim() ?? "";
  const senderEmail = body?.email?.trim() ?? "";
  const subject = body?.subject?.trim() ?? "";
  const message = body?.message?.trim() ?? "";
  const company = body?.company?.trim() ?? "";

  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !senderEmail || !subject || !message) {
    return NextResponse.json({ error: "Please complete every field." }, { status: 400 });
  }

  if (!isEmail(senderEmail)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [contactEmail],
      reply_to: senderEmail,
      subject: `Portfolio contact: ${subject}`,
      text: [`Name: ${name}`, `Email: ${senderEmail}`, `Subject: ${subject}`, "", message].join("\n"),
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "The message could not be sent." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
