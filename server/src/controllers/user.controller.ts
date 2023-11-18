import { Request, Response } from "express";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/auth.models";
import { IUser } from "../interfaces/auth.interface";

export const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const hashPassword = bycrpt.hashSync(password, 10);

  try {
    const findUser: IUser[] = await UserModel.find({ username });

    if (findUser[0]?.username === username)
      return res.send({
        status: 409,
        msg: "User is already exits or username not unique",
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
    const findUser: IUser[] = await UserModel.find({ username });

    if (!findUser.length)
      return res.send({ status: 409, msg: "User not found" });

    const passwordMatch = bycrpt.compareSync(password, findUser[0].password);

    if (!passwordMatch)
      return res.send({ status: 409, msg: "username or password error" });

    const accessToken = generateAccessToken({ username });

    return res.send({
      status: 200,
      msg: "User login succeffully",
      accessToken,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const data = await UserModel.find();
    return res.status(200).send({ data });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const logout = (req: Request, res: Response) => {};

const generateAccessToken = (payload: { username: string }) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "10m" });
};
