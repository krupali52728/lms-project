import api from './config.js';

// Create Stripe Checkout Session
export const createCheckoutSession = async (courseId, courseName, coursePrice, courseImage) => {
  try {
    const response = await api.post('/payment/create-checkout-session', {
      courseId,
      courseName,
      coursePrice: Math.round(coursePrice * 100), 
      courseImage,
    });
    return response.data;
  } catch (error) {
    console.error('Create checkout session error:', error);
    throw error;
  }
};

// Verify payment success (optional)
export const verifyPayment = async (sessionId) => {
  try {
    const response = await api.post('/payment/verify-session', {
      sessionId,
    });
    return response.data;
  } catch (error) {
    console.error('Verify payment error:', error);
    throw error;
  }
};
