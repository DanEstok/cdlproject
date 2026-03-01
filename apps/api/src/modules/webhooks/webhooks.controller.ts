import { Controller, Post, Body, Headers } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('stripe')
  async handleStripeWebhook(
    @Body() body: any,
    @Headers('stripe-signature') signature: string,
  ) {
    return this.webhooksService.handleStripeWebhook(body, signature);
  }

  @Post('twilio')
  async handleTwilioWebhook(@Body() body: any) {
    return this.webhooksService.handleTwilioWebhook(body);
  }
}
