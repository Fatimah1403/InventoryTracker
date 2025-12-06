import dotenv from "dotenv";
dotenv.config();

import sendEmail from "./sendEmail.js";

sendEmail({
  email: "yourpersonalemail@gmail.com",
  subject: "Test Email from Inventory Tracker",
  message: "<h1>Email is working!</h1>"
})
  .then(() => console.log("Email sent"))
  .catch((err) => console.error("Email error:", err));
