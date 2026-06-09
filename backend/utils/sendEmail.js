const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        // Create a test account for Ethereal email (if you don't have one, this generates it)
        const testAccount = await nodemailer.createTestAccount();

        // Create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        // Setup email data
        const mailOptions = {
            from: '"The Entrance" <noreply@theentrance.com>',
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html, // Optional HTML message
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
