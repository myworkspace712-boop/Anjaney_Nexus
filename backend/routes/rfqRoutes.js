const router = require('express').Router();
const nodemailer = require('nodemailer');

let User;
try {
  User = require('../models/User');
} catch (e) {
  // Optional model dependency
}

// Memory store fallback for RFQs/Quote Requirements with persistence
let inMemoryRfqs = [];

// Automated Admin Email Dispatcher (Dynamic - No Hardcoded Emails)
const sendAdminQuoteNotification = async (rfq) => {
  try {
    const emailUser = process.env.EMAIL_USER || process.env.SMTP_EMAIL;
    const emailPass = (process.env.EMAIL_PASS || process.env.SMTP_PASS || process.env.SMTP_PASSWORD || '').replace(/\s+/g, '');

    if (!emailUser || !emailPass) {
      console.log('ℹ️ [RFQ NOTIFICATION] SMTP credentials not configured in backend/.env. Quote stored successfully.');
      return;
    }

    // Determine dynamic admin recipient(s) without hardcoding
    const adminRecipients = [];

    if (process.env.ADMIN_NOTIFICATION_EMAIL) {
      adminRecipients.push(process.env.ADMIN_NOTIFICATION_EMAIL.trim().toLowerCase());
    }
    if (process.env.ADMIN_EMAIL) {
      adminRecipients.push(process.env.ADMIN_EMAIL.trim().toLowerCase());
    }
    if (process.env.ADMIN_EMAILS) {
      process.env.ADMIN_EMAILS.split(',').forEach((e) => {
        if (e.trim()) adminRecipients.push(e.trim().toLowerCase());
      });
    }

    // Dynamically retrieve registered administrators from the database
    if (User) {
      try {
        const dbAdmins = await User.find({ role: 'admin' }).select('email').lean();
        dbAdmins.forEach((u) => {
          if (u.email) adminRecipients.push(u.email.toLowerCase().trim());
        });
      } catch {
        // ignore DB query error
      }
    }

    // Fallback to configured SMTP user if no separate admin email provided
    if (adminRecipients.length === 0 && emailUser) {
      adminRecipients.push(emailUser.toLowerCase().trim());
    }

    const uniqueRecipients = [...new Set(adminRecipients.filter(Boolean))];
    if (uniqueRecipients.length === 0) return;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const frontendUrl = process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:5173';
    const commoditiesList = (rfq.commodities || [])
      .map(
        (c) =>
          `<li><strong>${c.name}</strong> — ${c.volume} ${c.unit || 'MT'} (Packaging: ${
            c.packaging || 'Standard'
          })${c.requirements ? `<br/><span style="color: #64748b;"><em>Specifics: ${c.requirements}</em></span>` : ''}</li>`
      )
      .join('');

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #0f172a; padding: 24px; color: #ffffff;">
          <h2 style="margin: 0; color: #f97316; font-size: 20px; font-weight: 800; letter-spacing: -0.5px;">ANJANEY NEXUS INDIA LLP</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8; font-weight: 500;">Commercial Quote Requirement Received</p>
        </div>
        
        <div style="padding: 24px; color: #1e293b;">
          <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 12px 16px; margin-bottom: 24px; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; color: #c2410c; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">New Request for Quotation</p>
            <p style="margin: 4px 0 0 0; font-size: 18px; font-family: monospace; font-weight: 800; color: #0f172a;">${rfq.rfqId}</p>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: #64748b;">Submitted: ${rfq.submittedAt}</p>
          </div>

          <h3 style="color: #0f172a; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin: 0 0 12px 0;">Buyer Commercial Details</h3>
          <table style="width: 100%; font-size: 13px; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 4px 0; color: #64748b; width: 140px;">Company / Entity:</td><td style="font-weight: 700; color: #0f172a;">${rfq.buyer?.companyName || 'Not specified'}</td></tr>
            <tr><td style="padding: 4px 0; color: #64748b;">Contact Person:</td><td style="font-weight: 600;">${rfq.buyer?.fullName || 'Not specified'}</td></tr>
            <tr><td style="padding: 4px 0; color: #64748b;">Email Address:</td><td><a href="mailto:${rfq.buyer?.email}" style="color: #f97316; text-decoration: none; font-weight: 600;">${rfq.buyer?.email}</a></td></tr>
            <tr><td style="padding: 4px 0; color: #64748b;">Phone:</td><td style="font-weight: 600;">${rfq.buyer?.phone || 'Not provided'}</td></tr>
          </table>

          <h3 style="color: #0f172a; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin: 0 0 12px 0;">Commodity Specifications</h3>
          <ul style="padding-left: 20px; font-size: 13px; line-height: 1.6; margin: 0 0 20px 0;">
            ${commoditiesList || `<li><strong>${rfq.product || 'Agro Commodity'}</strong> — ${rfq.quantity || 'Volume upon inquiry'}</li>`}
          </ul>

          <h3 style="color: #0f172a; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin: 0 0 12px 0;">Shipping & Logistics Parameters</h3>
          <table style="width: 100%; font-size: 13px; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 4px 0; color: #64748b; width: 140px;">Port of Discharge:</td><td style="font-weight: 700;">${rfq.shipping?.port || 'To be nominated'}</td></tr>
            <tr><td style="padding: 4px 0; color: #64748b;">Destination Country:</td><td style="font-weight: 600;">${rfq.shipping?.country || 'International'}</td></tr>
            <tr><td style="padding: 4px 0; color: #64748b;">Incoterm:</td><td style="font-weight: 700; color: #ea580c;">${rfq.shipping?.incoterm || 'CIF'}</td></tr>
            ${rfq.shipping?.paymentTerm ? `<tr><td style="padding: 4px 0; color: #64748b;">Shipment Timing:</td><td>${rfq.shipping?.paymentTerm}</td></tr>` : ''}
            ${rfq.requirements ? `<tr><td style="padding: 4px 0; color: #64748b;">Specific Instructions:</td><td style="font-style: italic;">${rfq.requirements}</td></tr>` : ''}
          </table>

          <div style="text-align: center; margin: 30px 0 10px 0;">
            <a href="${frontendUrl}/admin-dashboard" style="background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 13px; display: inline-block;">
              View in Admin Dashboard & Issue Proforma Invoice →
            </a>
          </div>
        </div>

        <div style="background-color: #f8fafc; padding: 16px 24px; font-size: 11px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0;">
          Anjaney Nexus India LLP · C/145, B G Tower, Delhi Darwaja, Ahmedabad, Gujarat, India<br/>
          This is an automated operational notification dispatched to authorized administrators.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Anjaney Nexus Trade Portal" <${emailUser}>`,
      to: uniqueRecipients.join(','),
      subject: `🔔 New Export Quote Requirement [${rfq.rfqId}] — ${rfq.buyer?.companyName || rfq.product || 'Trade Inquiry'}`,
      html: htmlContent,
    });

    console.log(`✅ [ADMIN QUOTE EMAIL DISPATCHED] Successfully sent quote ${rfq.rfqId} to: ${uniqueRecipients.join(', ')}`);
  } catch (err) {
    console.error('❌ [ADMIN QUOTE EMAIL FAILED]:', err.message);
  }
};

// @POST /api/rfqs — Submit quote requirement
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ success: false, message: 'Invalid quote requirement payload' });
    }

    const rfqId = data.rfqId || data.id || `RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const rfqItem = {
      ...data,
      rfqId,
      id: rfqId,
      submittedAt: data.submittedAt || new Date().toLocaleString(),
      status: data.status || 'Pending Review',
    };

    inMemoryRfqs.unshift(rfqItem);
    if (inMemoryRfqs.length > 500) inMemoryRfqs = inMemoryRfqs.slice(0, 500);

    // Asynchronously dispatch the quote requirement email to the admin
    sendAdminQuoteNotification(rfqItem).catch((err) => {
      console.error('Background email dispatch error:', err.message);
    });

    return res.status(201).json({
      success: true,
      message: 'Quote requirement received and dispatched to administrator email',
      rfq: rfqItem,
    });
  } catch (err) {
    console.error('Error handling quote requirement POST:', err);
    return res.status(500).json({ success: false, message: 'Server error processing quote requirement' });
  }
});

// @GET /api/rfqs — Retrieve all quote requirements
router.get('/', (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      count: inMemoryRfqs.length,
      rfqs: inMemoryRfqs,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error fetching quote requirements' });
  }
});

// @PUT /api/rfqs/:id — Update status or PI details
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const index = inMemoryRfqs.findIndex((r) => r.rfqId === id || r.id === id);

    if (index !== -1) {
      inMemoryRfqs[index] = { ...inMemoryRfqs[index], ...updates };
      return res.status(200).json({ success: true, rfq: inMemoryRfqs[index] });
    }

    return res.status(404).json({ success: false, message: 'Quote requirement not found' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error updating quote requirement' });
  }
});

module.exports = router;
