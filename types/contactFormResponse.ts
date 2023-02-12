import * as AWS from 'aws-sdk';

export interface TContactFormResponse {
  message: string;
  result?: AWS.SES.SendEmailResponse;
  error?: AWS.AWSError;
}
