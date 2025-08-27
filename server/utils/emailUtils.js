import transporter from "../config/nodemailer.js";  // ✅ use Brevo config

// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
export const sendOTPEmail = async (email, otp, name) => {
  const mailOptions = {
    from: `"LMS Platform" <${process.env.SENDER_EMAIL}>`, // must match Brevo verified sender
    to: email,
    subject: "Verify Your Email - LMS Platform",
    html: `
      <h2>Welcome to LMS Platform!</h2>
      <p>Hi ${name}, please verify your email address</p>
      <h3>Your OTP: <strong>${otp}</strong></h3>
      <p>This code will expire in 10 minutes.</p>
    `
  };

  try {
    console.log(`📩 Sending OTP email to: ${email}`);
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return { success: false, error: error.message };
  }
};
