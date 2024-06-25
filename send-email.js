const nodemailer = require('nodemailer');

// Configure the email transport using SMTP
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// Mockup form data for the example
// Replace this with actual data capture from your form
let formData = {
  firmenname: "Example Firma",
  vorname: "Max",
  nachname: "Mustermann",
  strasse: "Musterstrasse 1",
  postleitzahl: "12345",
  ort: "Musterstadt",
  telefon: "+41 123 456 789",
  email: "example@firma.com"
};

// Prepare email data
let mailOptions = {
  from: `"Formular" <${process.env.SMTP_USER}>`,
  to: process.env.EMAIL_TO,
  subject: 'Neue Formular-Einreichung',
  text: `Neue Formular-Einreichung:
  Firmenname: ${formData.firmenname}
  Vorname: ${formData.vorname}
  Nachname: ${formData.nachname}
  Strasse: ${formData.strasse}
  Postleitzahl: ${formData.postleitzahl}
  Ort: ${formData.ort}
  Telefon: ${formData.telefon}
  Email: ${formData.email}
  `
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
});
