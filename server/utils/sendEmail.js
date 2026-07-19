import nodemailer from "nodemailer";

const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.verify();

    await transporter.sendMail({
        from: `"School Management System" <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.message
    });

};

export default sendEmail;