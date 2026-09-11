/**
 * Environment variables for the contact form (delivered through Resend).
 *
 * Required
 *   RESEND_API_KEY      API key from https://resend.com/api-keys
 *   CONTACT_TO_EMAIL    Where contact form submissions are delivered
 *
 * Optional
 *   RESEND_FROM_EMAIL   Sender shown on the email. Defaults to Resend's shared
 *                       onboarding@resend.dev address, which needs no domain
 *                       setup but can only deliver to the Resend account
 *                       owner's email. Use an address on a verified domain
 *                       (e.g. hello@betweentheheights.com) to send anywhere.
 *   CONTACT_CC_EMAIL    Optional CC recipient
 *   CONTACT_SUBJECT     Subject prefix. Defaults to "New website message"
 */
function read(name: string): string {
  return process.env[name]?.trim() ?? '';
}

export const env = {
  RESEND_API_KEY: read('RESEND_API_KEY'),
  RESEND_FROM_EMAIL: read('RESEND_FROM_EMAIL') || 'Between The Heights <onboarding@resend.dev>',
  CONTACT_TO_EMAIL: read('CONTACT_TO_EMAIL'),
  CONTACT_CC_EMAIL: read('CONTACT_CC_EMAIL'),
  CONTACT_SUBJECT: read('CONTACT_SUBJECT') || 'New website message',
} as const;

/** Names of required variables that are not set. */
export function missingEnv(): string[] {
  return (['RESEND_API_KEY', 'CONTACT_TO_EMAIL'] as const).filter((key) => !env[key]);
}
