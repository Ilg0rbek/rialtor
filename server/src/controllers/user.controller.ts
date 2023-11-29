import { Request, Response } from "express";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/auth.models";
import { IUser } from "../interfaces/auth.interface";
import { Session } from "express-session";

export const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const hashPassword = bycrpt.hashSync(password, 10);

  try {
    const findUser: IUser | null = await UserModel.findOne({ username });

    if (findUser?.username === username || findUser?.email === email)
      return res.send({
        status: 409,
        msg: "User is already exits",
      });

    await UserModel.create({ username, password: hashPassword, email });

    return res.status(201).send({ status: 200, msg: "User is registered" });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const findUser: IUser | null = await UserModel.findOne({ username });

    if (!findUser) return res.send({ status: 409, msg: "User not found" });

    const passwordMatch = bycrpt.compareSync(password, findUser.password);

    if (!passwordMatch)
      return res.send({ status: 409, msg: "username or password error" });

    const accessToken = generateAccessToken({ username, id: findUser._id });

    //@ts-ignore
    const { password: pass, ...rest } = findUser._doc;
    res.cookie("access_token", accessToken, {
      httpOnly: true,
    });
    return res.send({
      status: 200,
      msg: "User login succeffully",
      user: rest,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const update = async (req: Request, res: Response) => {
  interface CustomSessionData extends Session {
    userId?: string;
  }
  const sessionData: CustomSessionData = req.session as CustomSessionData;
  const { id } = req.params;

  if (sessionData.userId != id)
    return res.status(401).send({ msg: "You can only update your account!" });

  try {
    if (req.body.password) {
      req.body.password = bycrpt.hashSync(req.body.password, 10);
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    //@ts-ignore
    const { password, ...rest } = updateUser._doc;

    return res.status(200).send({ data: rest });
  } catch (error: any) {
    console.log(error.message);
  }

  return res.send("hello");
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const data = await UserModel.find();
    return res.status(200).send({ data });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const google = async (req: Request, res: Response) => {
  const { email, username } = req.body;

  try {
    const findUser: IUser | null = await UserModel.findOne({ email });

    if (findUser) {
      const token = generateAccessToken({ username, id: findUser._id });
      //@ts-ignore
      const { password: pass, ...rest } = user._doc;
      res.cookie("access_token", token, { httpOnly: true }).send({
        status: 200,
        msg: "User login succeffully",
        user: rest,
      });
    } else {
      const generatPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashPassword = bycrpt.hashSync(generatPassword, 10);
      const newUser = new UserModel({
        username:
          username.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        password: hashPassword,
        email,
        avatar: req.body.photo,
      });

      await newUser.save();

      //@ts-ignore
      const { password: pass, ...rest } = newUser._doc;
      res.send({
        status: 200,
        msg: "User login succeffully",
        user: rest,
      });
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleted = async (req: Request, res: Response) => {
  interface CustomSessionData extends Session {
    userId?: string;
  }
  const sessionData: CustomSessionData = req.session as CustomSessionData;
  const { id } = req.params;
  if (id != sessionData.userId)
    return res.status(401).send({ msg: "You can only delete your account!" });
  try {
    await UserModel.findByIdAndDelete(id);
    res.clearCookie("access_token");
    return res.status(200).send({ msg: "Has been deleted your accout!" });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access_token");
    return res.status(200).send({ msg: "User has been logged out !" });
  } catch (error: any) {
    console.log(error.message);
  }
};

const generateAccessToken = (payload: { username: string; id: string }) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "10m" });
};
