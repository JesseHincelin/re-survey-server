import nodemailer from "nodemailer";

export const sendMail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587, //remove for test with hotmail maybe ?
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });

    const options = {
      from: process.env.EMAIL_SENDER,
      to,
      subject,
      text: message,
    };
    await transporter.sendMail(options);
    console.log("Email sent successfully");
  } catch (e) {
    console.log("Email not sent");
    console.log(e.message);
  }
};
