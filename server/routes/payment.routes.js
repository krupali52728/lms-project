import express from 'express';
import Stripe from 'stripe';


const paymentRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// Create Stripe Checkout Session
paymentRouter.post('/create-checkout-session', async (req, res) => {
  try {
    const { courseId, courseName, coursePrice, courseImage } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: courseName,
              images: courseImage ? [courseImage] : [],
              description: `Access to ${courseName} course with lifetime access`,
            },
            unit_amount: coursePrice, 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/success?session_id={CHECKOUT_SESSION_ID}&course_id=${courseId}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/course/${courseId}`,
      metadata: {
        courseId: courseId,
      },
    });

    res.status(200).json({ 
      success: true,
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.log('Create Checkout Session Error:', error.message);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Verify checkout session
paymentRouter.post('/verify-session', async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      res.status(200).json({
        success: true,
        session: session,
        courseId: session.metadata.courseId,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment not completed',
      });
    }
  } catch (error) {
    console.log('Verify Session Error:', error.message);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Webhook to handle successful payments
paymentRouter.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const courseId = session.metadata.courseId;
      
      console.log('Payment successful for course:', courseId);
      console.log('Session ID:', session.id);
      console.log('Customer Email:', session.customer_details.email);
      
      
      
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

export default paymentRouter;
