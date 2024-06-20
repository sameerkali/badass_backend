const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/send-bulk-emails", async (req, res) => {
  const { emails, subject, text } = req.body;
  const results = [];

  for (let email of emails) {
    try {
      console.log("try is running");
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text
      });
      results.push({ email, status: "Sent" });
    } catch (error) {
      console.log("catch is running");
      console.error(`Failed to send email to ${email}:`, error);
      results.push({ email, status: "Failed", error: error.message });
    }
  }

  res.json(results);
});

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
