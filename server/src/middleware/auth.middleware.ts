import { Response, Request, NextFunction } from "express";
import { SessionData, Session } from "express-session";
import jwt from "jsonwebtoken";

interface CustomSessionData extends Session {
  userId?: string;
}
export const checkTokenExpired = (
  req: Request<{}, {}, SessionData>,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];

  if (!token) return res.send({ msg: "Token is not found" });
  jwt.verify(token, "secret", (err, decode: any) => {
    const sessionData: CustomSessionData = req.session as CustomSessionData;
    sessionData.userId = decode.id;
    if (err) {
      return res.send({ msg: "Token is expired" });
    }
    next();
  });
};
