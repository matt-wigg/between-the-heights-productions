import * as AWS from 'aws-sdk';
import {
  FROM_EMAIL,
  TO_EMAIL,
  CC_EMAIL,
  EMAIL_SUBJECT,
} from '@/config/enviroments';
import { configureAWS } from '@/config/aws';
import { TContactFormRequestBody } from '@/types/contactFormRequestBody';
import { TContactFormResponse } from '@/types/contactFormResponse';

export default async function handleContactFormSubmission(
  req: { body: TContactFormRequestBody; method: string },
  res: {
    status: (statusCode: number) => {
      send: (json: TContactFormResponse) => void;
    };
  }
) {
  // Check if request method is POST
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed' });
  }

  // Destructure request body and set default phone value
  const { name, email, message } = req.body;
  const phone = req.body.phone || 'Not provided';

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).send({ message: 'Missing required form fields' });
  }

  // Configure AWS and create SES client
  configureAWS();
  const sesClient = new AWS.SES();

  // Define email parameters
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
          Phone: ${phone}
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

  // Send email
  try {
    const result = await sesClient.sendEmail(emailParams).promise();

    // Return success response
    res.status(200).send({
      message: 'Your message was sent successfully!',
      result,
    });
  } catch (error: AWS.AWSError | any) {
    // Return error response
    res.status(400).send({
      message: 'Your message failed to send, please try again later.',
      error,
    });
  }
}
