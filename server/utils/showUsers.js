import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/UserModel.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const users = await User.find({});
console.log("All users:", users);

process.exit();
