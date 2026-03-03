import { WebhooksService } from './webhooks.service';
export declare class WebhooksController {
    private readonly webhooksService;
    constructor(webhooksService: WebhooksService);
    handleStripeWebhook(body: any, signature: string): Promise<{
        status: string;
        type: string;
    }>;
    handleTwilioWebhook(body: any): Promise<{
        status: string;
        type: string;
    }>;
}
