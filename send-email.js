const nodemailer = require('nodemailer');

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, EMAIL_TO } = process.env;

// Konfiguriere den SMTP-Transporter
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,  // true für SSL/TLS, false für unverschlüsselt
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
    }
});

// Funktion zum Senden der E-Mail
async function sendEmail() {
    const mailOptions = {
        from: SMTP_USER,  // Absenderadresse (kann angepasst werden)
        to: EMAIL_TO,  // Empfängeradresse
        subject: 'Neue Nachricht vom Kontaktformular',
        text: 'Dies ist eine Testnachricht vom Kontaktformular.'  // Hier kannst du die tatsächlichen Formulardaten einfügen
    };

    try {
        // E-Mail senden
        await transporter.sendMail(mailOptions);
        console.log('E-Mail erfolgreich versendet');
    } catch (error) {
        console.error('Beim Versenden der E-Mail ist ein Fehler aufgetreten:', error);
    }
}

sendEmail();
