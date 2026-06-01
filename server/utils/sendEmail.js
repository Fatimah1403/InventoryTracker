// import nodemailer from 'nodemailer';

// const sendEmail = async (options) => {
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.SMTP_USER,
//             pass: process.env.SMTP_PASSWORD
//         },
//     });

//     const mailOptions = {
//         from: `Inventory Management <${process.env.SMTP_USER}>`,
//         to: options.email,
//         subject: options.subject,
//         html: options.message,
//     };
//     await transporter.sendMail(mailOptions);
// };
// export default sendEmail;

import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || `Inventory Tracker <${process.env.SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.verify();
  console.log("SMTP Connected");

  await transporter.sendMail(mailOptions);
};

export default sendEmail;