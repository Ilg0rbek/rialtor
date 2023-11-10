import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkTokenExpired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.headers.authorization?.split(" ")[0];

  if (!token) return res.send({ msg: "Token is not found" });

  jwt.verify(token, (err, decode) => {
    if (err) {
      return res.send({ msg: "Token is expired" });
    }
  });
};
