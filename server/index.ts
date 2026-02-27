import express from "express";
import { createServer } from "http";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON request bodies
  app.use(express.json());

  // ── Contact Form API ──
  app.post("/api/contact", async (req, res) => {
    try {
      const { firstName, lastName, email, message } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ 
          success: false, 
          error: "All fields are required." 
        });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          success: false, 
          error: "Please provide a valid email address." 
        });
      }

      // Configure email transport
      // Uses SMTP env vars if available, otherwise falls back to a mailto link approach
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = parseInt(process.env.SMTP_PORT || "587");
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const recipientEmail = process.env.CONTACT_EMAIL || "foundation@cccd.edu";

      if (smtpHost && smtpUser && smtpPass) {
        // Full SMTP transport when credentials are configured
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Coastline College Foundation Website" <${smtpUser}>`,
          replyTo: `"${firstName} ${lastName}" <${email}>`,
          to: recipientEmail,
          subject: `New Contact Form Submission from ${firstName} ${lastName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #0A1628; color: white; padding: 24px 32px; border-radius: 12px 12px 0 0;">
                <h2 style="margin: 0; font-size: 20px;">New Contact Form Submission</h2>
                <p style="margin: 8px 0 0; opacity: 0.7; font-size: 14px;">Coastline College Foundation Website</p>
              </div>
              <div style="background: #f8fafc; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; width: 120px;">Name</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${firstName} ${lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #475569; vertical-align: top;">Message</td>
                    <td style="padding: 12px 0; color: #1e293b; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td>
                  </tr>
                </table>
              </div>
            </div>
          `,
          text: `New Contact Form Submission\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
        });

        console.log(`Contact form email sent to ${recipientEmail} from ${email}`);
        return res.json({ success: true, message: "Your message has been sent successfully." });
      } else {
        // Fallback: Log the submission and store it when SMTP is not configured
        console.log("──────────────────────────────────────");
        console.log("NEW CONTACT FORM SUBMISSION");
        console.log(`Name: ${firstName} ${lastName}`);
        console.log(`Email: ${email}`);
        console.log(`Message: ${message}`);
        console.log(`Intended recipient: ${recipientEmail}`);
        console.log("──────────────────────────────────────");

        // Still return success — the form data is captured in server logs
        // and can be forwarded manually or via a log monitoring service
        return res.json({ 
          success: true, 
          message: "Your message has been received. We will be in touch soon." 
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({ 
        success: false, 
        error: "Something went wrong. Please try again or email us directly at foundation@cccd.edu." 
      });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
