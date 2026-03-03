export declare class WebhooksService {
    handleStripeWebhook(body: any, signature: string): {
        status: string;
        type: string;
    };
    handleTwilioWebhook(body: any): {
        status: string;
        type: string;
    };
}
