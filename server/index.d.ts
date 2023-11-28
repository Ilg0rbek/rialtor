import { Session } from "express-session";

interface MySessionData extends Session {
  userId?: string;
}

declare module "express-session" {
  interface SessionData {
    mySession: MySessionData;
  }
}
