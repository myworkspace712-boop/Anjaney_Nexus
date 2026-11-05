const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const nodemailer = require('nodemailer');

const getTransporter = () => {
  const emailUser = process.env.EMAIL_USER || process.env.SMTP_EMAIL;
  const emailPass = (process.env.EMAIL_PASS || process.env.SMTP_PASS || process.env.SMTP_PASSWORD || '').replace(/\s+/g, '');

  if (!emailUser || !emailPass) {
    throw new Error("Missing email credentials (EMAIL_USER / EMAIL_PASS) in backend/.env file.");
  }

  // 1. USE THE 'gmail' SERVICE PRESET
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

const sendEmail = async (to, subject, text, html) => {
  const emailUser = process.env.SMTP_EMAIL || process.env.EMAIL_USER;
  console.log("📨 Email utility triggered for:", to, "using SMTP User:", emailUser);

  const transporter = getTransporter();

  try {
    const mailOptions = {
      from: `"Anjaney Nexus" <${emailUser}>`,
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

module.exports = { sendEmail, getTransporter };
