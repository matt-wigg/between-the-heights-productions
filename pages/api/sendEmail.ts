import * as AWS from 'aws-sdk';

interface RequestBody {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'betweentheheights@gmail.com';
const TO_EMAIL = process.env.TO_EMAIL || 'betweentheheights@gmail.com';
const CC_EMAIL = process.env.CC_EMAIL || 'betweentheheights@gmail.com';
const EMAIL_SUBJECT = '!New Website Message';

export default async function handler(
  req: { body: RequestBody; method: string },
  res: { status: (statusCode: number) => { json: (json: object) => void } }
) {
  if (
    req.method !== 'POST' ||
    !req.body.name ||
    !req.body.email ||
    !req.body.message
  ) {
    res
      .status(405)
      .json({ message: 'Method not allowed or missing required fields' });
    return;
  }

  AWS.config.update({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });

  const { name, email, phone, message } = req.body;
  const ses = new AWS.SES();
  const params: AWS.SES.SendEmailRequest = {
    Destination: {
      CcAddresses: [CC_EMAIL],
      ToAddresses: [TO_EMAIL],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `
          You have a new message from your website contact form.\n
          Here are the details:\n
          Name: ${name}\n
          Email: ${email}\n
          Phone: ${phone}\n
          Message: ${message}\n 
          `,
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
    const result = await ses.sendEmail(params).promise();
    res.status(200).json({
      message: 'Your message was sent successfully - speak soon!',
      result,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Your message failed to send - you broke it!', error });
  }
}
