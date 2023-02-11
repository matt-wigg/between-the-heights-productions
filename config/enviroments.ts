interface EnvironmentVariables {
  AWS_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  FROM_EMAIL: string;
  TO_EMAIL: string;
  CC_EMAIL: string;
  EMAIL_SUBJECT: string;
}

const environmentVariables: EnvironmentVariables = {
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
