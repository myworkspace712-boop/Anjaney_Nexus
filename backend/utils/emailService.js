const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const nodemailer = require('nodemailer');

const getTransporter = () => {
  const emailUser = process.env.EMAIL_USER || process.env.SMTP_EMAIL;
  const emailPass = (process.env.EMAIL_PASS || process.env.SMTP_PASS || process.env.SMTP_PASSWORD || '').replace(/\s+/g, '');

  if (!emailUser || !emailPass) {
    throw new Error('Email credentials are missing from environment variables (EMAIL_USER / EMAIL_PASS).');
  }

  // 1. USE THE 'gmail' SERVICE PRESET
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

const sendVerificationEmail = async (toEmail, token = '') => {
  const currentUser = process.env.SMTP_EMAIL || process.env.EMAIL_USER;
  const currentPass = (process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.SMTP_PASSWORD || '').replace(/\s+/g, '');

  if (!currentUser || !currentPass) {
    throw new Error('SMTP credentials are missing from environment variables (SMTP_EMAIL / SMTP_PASS).');
  }

  const transporter = getTransporter();

  const frontendUrl = process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:5173';
  const tokenQuery = token ? `&token=${encodeURIComponent(token)}` : '';
  const verificationUrl = `${frontendUrl}/verify-email?email=${encodeURIComponent(toEmail)}${tokenQuery}`;

  const mailOptions = {
    from: `"Anjaney Nexus" <${currentUser}>`,
    to: toEmail,
    subject: 'Action Required: Verify your Anjaney Nexus Account',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06);">
        <div style="background: #0f172a; padding: 28px 24px; text-align: center; border-bottom: 3px solid #ea580c;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.5px;">
            Anjaney Nexus <span style="color: #f97316;">India</span>
          </h1>
          <p style="color: #94a3b8; font-size: 13px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 1px;">Account Verification</p>
        </div>
        <div style="padding: 36px 32px;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 700;">Verify Your Email Address</h2>
          <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
            Thank you for registering with <strong>Anjaney Nexus</strong>. To activate your account for <span style="color: #ea580c; font-weight: 600;">${toEmail}</span> and complete your registration, please click the button below:
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${verificationUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #ea580c; color: #ffffff; padding: 14px 36px; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 15px; display: inline-block; box-shadow: 0 4px 14px rgba(234,88,12,0.35);">
              Verify My Email
            </a>
          </div>
          <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin-top: 24px;">
            Or copy and paste this link directly into your browser:
          </p>
          <p style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 12px; font-family: monospace; word-break: break-all; color: #334155;">
            ${verificationUrl}
          </p>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">
            This verification link will remain active for 24 hours.
          </p>
        </div>
        <div style="background: #f8fafc; padding: 20px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">
            If you didn't create an account on Anjaney Nexus, you can safely ignore this email.
          </p>
        </div>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

// Also export reset password email for backwards compatibility
const sendPasswordResetEmail = async (toEmail, token) => {
  const currentUser = process.env.SMTP_EMAIL || process.env.EMAIL_USER;
  const frontendUrl = process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:5173';
  const resetUrl = `${frontendUrl}/reset-password/${token}`;
  const transporter = getTransporter();

  return transporter.sendMail({
    from: `"Anjaney Nexus" <${currentUser}>`,
    to: toEmail,
    subject: '🔐 Reset your Anjaney Nexus password',
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" style="display:inline-block; padding:10px 20px; background-color:#ea580c; color:white; text-decoration:none; border-radius:5px;">Reset Password</a>
    `,
  });
};

module.exports = { getTransporter, sendVerificationEmail, sendPasswordResetEmail };
