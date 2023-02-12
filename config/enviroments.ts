import { TEnvironmentVariables } from '@/types/environmentVariables';

const environmentVariables: TEnvironmentVariables = {
  AWS_REGION: process.env.AWS_REGION || '',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  FROM_EMAIL: process.env.FROM_EMAIL || '',
  TO_EMAIL: process.env.TO_EMAIL || '',
  CC_EMAIL: process.env.CC_EMAIL || '',
  EMAIL_SUBJECT: process.env.EMAIL_SUBJECT || '',
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
