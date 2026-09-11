import { TEnvironmentVariables } from '@/types/environmentVariables';

/**
 * Read the first non-empty value from a list of environment variable names.
 *
 * Vercel injects its own placeholder AWS_REGION / AWS_ACCESS_KEY_ID /
 * AWS_SECRET_ACCESS_KEY into every function. Those values carry no AWS
 * permissions, so the SES_* names are checked first and the AWS_* names are
 * only used as a fallback (for local development or other hosts).
 */
function fromEnv(...names: string[]): string {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }
  return '';
}

const environmentVariables: TEnvironmentVariables = {
  AWS_REGION: fromEnv('SES_REGION', 'AWS_REGION'),
  AWS_ACCESS_KEY_ID: fromEnv('SES_ACCESS_KEY_ID', 'AWS_ACCESS_KEY_ID'),
  AWS_SECRET_ACCESS_KEY: fromEnv('SES_SECRET_ACCESS_KEY', 'AWS_SECRET_ACCESS_KEY'),
  FROM_EMAIL: fromEnv('FROM_EMAIL'),
  TO_EMAIL: fromEnv('TO_EMAIL'),
  CC_EMAIL: fromEnv('CC_EMAIL'),
  EMAIL_SUBJECT: fromEnv('EMAIL_SUBJECT'),
};

export const {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  FROM_EMAIL,
  TO_EMAIL,
  CC_EMAIL,
  EMAIL_SUBJECT,
} = environmentVariables;
