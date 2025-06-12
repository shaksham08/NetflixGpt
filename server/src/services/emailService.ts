import nodemailer from "nodemailer";

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // App Password if 2FA is on
  },
});

export const sendPasswordResetEmail = async (
  email: string,
  resetLink: string
) => {
  const mailOptions = {
    from: `"Support Team" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Password Reset Request",
    html: `
      <h2>Password Reset</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>If you did not request this, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};
