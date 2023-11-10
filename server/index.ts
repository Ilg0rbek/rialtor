import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";

const bootsrapt = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Rialtor");
    console.log("Connect to mongo successfully ✅");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT} 🟢`);
    });
    
  } catch (error: any) {
    console.log(`${error.message} ❎`);
  }
};

bootsrapt();
