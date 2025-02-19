import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { client } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get('stripe-signature');

    if (!sig) {
        return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.log('No webhook secret');
        return NextResponse.json({ error: 'No webhook secret' }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (e) {
        console.error('webhok signature verification failed: ', e);
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        try {
            const order = await createOrderInSanity(session);
            console.log('Order Created in Sanity', order);
        } catch (e) {
            return NextResponse.json(
                { error: 'Failed to create order in Sanity', e },
                { status: 500 }
            )
        }
    }

    return NextResponse.json({ received: true });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
    const { id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer,
        total_details
    } = session;

    const { orderNumber, customerName, customerEmail, clerkUserId } = metadata as Metadata;

    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        id,
        { expand: ['data.price.product'] });

    const sanityProducts = lineItemsWithProduct.data.map((item) => ({
        _key: crypto.randomUUID(),
        product: {
            _type: 'reference',
            _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
        },
        quantity: item.quantity || 0,
    }))

    // Create the order in Sanity
    const order = await client.create({
        _type: 'order',
        orderNumber,
        stripeCheckoutSessionId: id,
        stripePaymentIntentId: payment_intent,
        customerName,
        stripeCustomerId: customer,
        clerkUserId: clerkUserId,
        email: customerEmail,
        currency,
        amountDiscount: total_details?.amount_discount
            ? total_details.amount_discount / 100
            : 0,
        products: sanityProducts,
        totalPrice: amount_total ? amount_total / 100 : 0,
        status: 'paid',
        orderDate: new Date().toISOString(),
    });

    // Reduce stock levels for purchased products
    const transactions = client.transaction();

    await Promise.all(
        sanityProducts.map(async (item) => {
            try {
                const productId = item.product._ref;
                const product = await client.getDocument(productId);

                if (product && product?.stock != undefined) {
                    const newStock = Math.max(0, product.stock - item.quantity);
                    transactions.patch(productId, (p) => p.set({ stock: newStock }));
                }
            } catch (e) {
                console.error(`Failed to update stock for product ${item.product._ref}:`, e);
            }
        })
    )
    await transactions.commit()

    return order;
}
