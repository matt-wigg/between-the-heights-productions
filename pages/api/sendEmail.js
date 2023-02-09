const AWS = require('aws-sdk');

export default async function handler(req, res) {
  const { name, email, phone, message } = req.body;

  AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const ses = new AWS.SES();

  const params = {
    Destination: {
      ToAddresses: ['betweentheheights@gmail.com'],
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
        Data: `!New Website Message! ${email}`,
      },
    },
    Source: `${name} <betweentheheights@gmail.com>`,
  };

  try {
    const result = await ses.sendEmail(params).promise();
    res.status(200).json({ message: 'Email sent successfully', result });
  } catch (error) {
    res.status(400).json({ message: 'Email sending failed', error });
  }
}
