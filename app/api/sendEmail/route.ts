import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { env, missingEnv } from '@/config/env';
import type { TContactFormRequestBody } from '@/types/contactFormRequestBody';

export const runtime = 'nodejs';

const LIMITS = { name: 200, email: 320, phone: 60, message: 5000 } as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function field(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

/** Strip characters that could be used to inject additional mail headers. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n"<>]/g, ' ').trim();
}

function json(body: { message?: string; error?: string; code?: string }, status = 200) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  let body: Partial<TContactFormRequestBody>;
  try {
    body = (await request.json()) as Partial<TContactFormRequestBody>;
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const name = field(body.name, LIMITS.name);
  const email = field(body.email, LIMITS.email);
  const phone = field(body.phone, LIMITS.phone) || 'Not provided';
  const message = field(body.message, LIMITS.message);

  if (!name || !email || !message) {
    return json({ error: 'Name, email and project details are needed to send.' }, 400);
  }
  if (!EMAIL_PATTERN.test(email)) {
    return json({ error: 'That email address does not look right.' }, 400);
  }

  const missing = missingEnv();
  if (missing.length > 0) {
    console.error(`sendEmail: missing environment variables: ${missing.join(', ')}`);
    return json(
      { error: 'The contact form is not configured. Please email us directly.', code: 'NotConfigured' },
      500,
    );
  }

  const resend = new Resend(env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: [env.CONTACT_TO_EMAIL],
    cc: env.CONTACT_CC_EMAIL ? [env.CONTACT_CC_EMAIL] : undefined,
    replyTo: email,
    subject: `${env.CONTACT_SUBJECT} from ${headerSafe(name)}`,
    text: [
      'You have a new message from your website contact form.',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      '',
      'Message:',
      message,
    ].join('\n'),
  });

  if (error) {
    console.error(
      `sendEmail: Resend rejected the message [${error.name}] ${error.message} (from=${env.RESEND_FROM_EMAIL}, to=${env.CONTACT_TO_EMAIL})`,
    );
    // The Resend error name (e.g. validation_error, missing_api_key) is safe
    // to return and makes the failure diagnosable from the browser.
    return json({ error: 'Your message failed to send, please try again later.', code: error.name }, 502);
  }

  console.log(`sendEmail: delivered via Resend (id=${data?.id ?? 'unknown'})`);
  return json({ message: 'Your message was sent successfully!' });
}

export function GET() {
  return json({ error: 'Method not allowed' }, 405);
}
