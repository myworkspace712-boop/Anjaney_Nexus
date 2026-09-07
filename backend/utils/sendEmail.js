require('dotenv').config();
const nodemailer = require('nodemailer');

/*
const transporter = nodemailer.createTransport({
  service: 'gmail', // This automatically configures the correct host/port for Google
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // This will be the Google App Password
  },
});

// Add a startup check to verify the credentials immediately
transporter.verify((error, success) => {
  if (error) {
    console.error(error);
  } else {
    console.log("✅ [SMTP SUCCESS] Gmail is connected. You can now send verification emails to ANY address.");
  }
});
*/
// Provide a dummy transporter so exports don't crash
const transporter = null;

const sendEmail = async (to, subject, text, html) => {
  console.log("📨 Email utility triggered for:", to, "using SMTP User:", process.env.SMTP_EMAIL);
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    throw new Error("🚨 FATAL: Missing SMTP credentials in .env file. Cannot send real emails.");
  }

  try {

    const mailOptions = {
      from: `"Anjaney Nexus" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    
    if (info.rejected && info.rejected.length > 0) {
      console.error("🔴 SMTP Server REJECTED these addresses:", info.rejected);
      console.error("🔴 SMTP Server Response:", info.response);
      throw new Error(`Email rejected by server for ${info.rejected.join(', ')}`);
    }

    console.log("🟢 Email successfully sent to:", info.accepted);
    return info;
  } catch (error) {
    console.error("🔴 Nodemailer Failed:", error);
    console.error("🔴 SMTP Rejection Details:", error.response || error.message, error.command);
    throw error;
  }
};

module.exports = { sendEmail, transporter };
