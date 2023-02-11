import * as AWS from 'aws-sdk';
import {
  FROM_EMAIL,
  TO_EMAIL,
  CC_EMAIL,
  EMAIL_SUBJECT,
} from '../../config/enviroments';
import { configureAWS } from '../../config/aws';

interface RequestBody {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default async function handleContactFormSubmission(
  req: { body: RequestBody; method: string },
  res: {
    status: (statusCode: number) => {
      json: (json: {
        message: string;
        result?: object;
        error?: string;
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

  configureAWS();
  const sesClient = new AWS.SES();
  const emailParams: AWS.SES.SendEmailRequest = {
    Destination: {
      CcAddresses: [CC_EMAIL || 'invalid-email'],
      ToAddresses: [TO_EMAIL || 'invalid-email'],
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
        Data: `${EMAIL_SUBJECT} from ${email}`,
      },
    },
    Source: `${name} <${FROM_EMAIL}>`,
  };

  try {
    const result = await sesClient.sendEmail(emailParams).promise();
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
