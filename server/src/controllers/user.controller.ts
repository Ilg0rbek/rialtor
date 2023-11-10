import { Request, Response } from "express";
import { UserModel } from "../models/auth.models";

export const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  const data = UserModel.create({ username, password, email }, { new: true });

  return res.status(200).send({ msg: "Data is saved", data });
};

export const login = async (req: Request, res: Response) => {};

export const findAll = async (req: Request, res: Response) => {};

export const logout = (req: Request, res: Response) => {};
