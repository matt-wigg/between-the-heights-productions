import * as AWS from 'aws-sdk';

interface RequestBody {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default async function handler(
  req: { body: RequestBody },
  res: { status: (statusCode: number) => { json: (json: object) => void } }
) {
  const { name, email, phone, message } = req.body;

  AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const ses = new AWS.SES();

  const params: AWS.SES.SendEmailRequest = {
    Destination: {
      ToAddresses: ['danielduvall22@gmail.com'],
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
        Data: `!New Website Message from ${email}!`,
      },
    },
    Source: `${name} <betweentheheights@gmail.com>`,
  };

  try {
    const result = await ses.sendEmail(params).promise();
    res.status(200).json({
      message: 'Your messages was sent successfully - speak soon!',
      result,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Your message failed to send - you broke it!', error });
  }
}
