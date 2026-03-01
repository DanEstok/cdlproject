import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhooksService {
  handleStripeWebhook(body: any, signature: string) {
    return { status: 'received', type: 'stripe' };
  }

  handleTwilioWebhook(body: any) {
    return { status: 'received', type: 'twilio' };
  }
}
