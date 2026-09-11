import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { NextResponse } from 'next/server';

import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  CC_EMAIL,
  EMAIL_SUBJECT,
  FROM_EMAIL,
  TO_EMAIL,
} from '@/config/enviroments';
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

/** Short, secret-free description of an SES/SDK failure for logs and clients. */
function describeError(error: unknown): { code: string; detail: string } {
  if (error && typeof error === 'object') {
    const e = error as { name?: unknown; Code?: unknown; message?: unknown };
    const code = String(e.name || e.Code || 'UnknownError');
    return { code, detail: typeof e.message === 'string' ? e.message : '' };
  }
  return { code: 'UnknownError', detail: String(error) };
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

  const missing = Object.entries({
    'SES_REGION / AWS_REGION': AWS_REGION,
    'SES_ACCESS_KEY_ID / AWS_ACCESS_KEY_ID': AWS_ACCESS_KEY_ID,
    'SES_SECRET_ACCESS_KEY / AWS_SECRET_ACCESS_KEY': AWS_SECRET_ACCESS_KEY,
    FROM_EMAIL,
    TO_EMAIL,
  })
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.error(`sendEmail: missing environment variables: ${missing.join(', ')}`);
    return json(
      { error: 'The contact form is not configured. Please email us directly.', code: 'NotConfigured' },
      500,
    );
  }

  const client = new SESClient({
    region: AWS_REGION,
    credentials: { accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY },
  });

  const command = new SendEmailCommand({
    Source: `${headerSafe(name)} <${FROM_EMAIL}>`,
    ReplyToAddresses: [email],
    Destination: {
      ToAddresses: [TO_EMAIL],
      CcAddresses: CC_EMAIL ? [CC_EMAIL] : [],
    },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: `${EMAIL_SUBJECT || 'New website message'} from ${headerSafe(email)}`,
      },
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: [
            'You have a new message from your website contact form.',
            '',
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            '',
            'Message:',
            message,
          ].join('\n'),
        },
      },
    },
  });

  try {
    await client.send(command);
    return json({ message: 'Your message was sent successfully!' });
  } catch (error) {
    const { code, detail } = describeError(error);
    console.error(
      `sendEmail: SES send failed [${code}] ${detail} (region=${AWS_REGION}, keyId=${AWS_ACCESS_KEY_ID.slice(0, 4)}…, from=${FROM_EMAIL}, to=${TO_EMAIL})`,
    );
    // The SES error name (e.g. MessageRejected, InvalidClientTokenId,
    // AccessDenied) is safe to return and makes the failure diagnosable
    // from the browser without needing server logs.
    return json({ error: 'Your message failed to send, please try again later.', code }, 502);
  }
}

export function GET() {
  return json({ error: 'Method not allowed' }, 405);
}
