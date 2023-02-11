import * as AWS from 'aws-sdk';

interface RequestBody {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface EnvironmentVariables {
  AWS_REGION: string | undefined;
  AWS_ACCESS_KEY_ID: string | undefined;
  AWS_SECRET_ACCESS_KEY: string | undefined;
  FROM_EMAIL: string | undefined;
  TO_EMAIL: string | undefined;
  CC_EMAIL: string | undefined;
  EMAIL_SUBJECT: string | undefined;
}

const environmentVariables: EnvironmentVariables = {
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  FROM_EMAIL: process.env.FROM_EMAIL,
  TO_EMAIL: process.env.TO_EMAIL,
  CC_EMAIL: process.env.CC_EMAIL,
  EMAIL_SUBJECT: process.env.EMAIL_SUBJECT,
};

export default async function sendContactFormEmail(
  req: { body: RequestBody; method: string },
  res: {
    status: (statusCode: number) => {
      json: (json: {
        message: string;
        result?: object;
        error?: object;
      }) => void;
    };
  }
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  AWS.config.update({
    region: environmentVariables.AWS_REGION,
    accessKeyId: environmentVariables.AWS_ACCESS_KEY_ID,
    secretAccessKey: environmentVariables.AWS_SECRET_ACCESS_KEY,
  });

  const ses = new AWS.SES();
  const emailParams: AWS.SES.SendEmailRequest = {
    Destination: {
      CcAddresses: [environmentVariables.CC_EMAIL || 'invalid-email'],
      ToAddresses: [environmentVariables.TO_EMAIL || 'invalid-email'],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `You have a new message from your website contact form.
          Here are the details:
          Name: ${name}
          Email: ${email}
          Phone: ${req.body.phone || 'Not provided'}
          Message: ${message}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `${environmentVariables.EMAIL_SUBJECT} from ${email}`,
      },
    },
    Source: `${name} <${environmentVariables.FROM_EMAIL}>`,
  };

  try {
    const result = await ses.sendEmail(emailParams).promise();
    res.status(200).json({
      message: 'Your message was sent successfully - speak soon!',
      result,
    });
  } catch (error: AWS.AWSError | any) {
    res.status(400).json({
      message: 'Your message failed to send - please try again later',
      error: error.message,
    });
  }
}
