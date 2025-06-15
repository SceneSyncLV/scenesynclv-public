# Stripe Integration

To enable featured event checkout:

1. Add these to your `.env.local`:

```
NEXT_PUBLIC_STRIPE_PK=pk_test_...
STRIPE_SK=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_BASE_URL=https://your-deployed-url.vercel.app
```

2. In the Stripe dashboard:
   - Create a webhook endpoint: `/api/stripe-webhook`
   - Listen for `checkout.session.completed`
   - Use the signing secret for `STRIPE_WEBHOOK_SECRET`

3. The feature button will appear for your events if you are signed in and the event is not currently featured.

4. After payment, the event will be featured for 24 hours.

---
