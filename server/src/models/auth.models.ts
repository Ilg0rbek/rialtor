import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    avatar: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvSbizvnY0c2sfqq71ANwRU_KyAdmYPI1wA&usqp=CAU",
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
