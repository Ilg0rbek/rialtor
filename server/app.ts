import express, { Express, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import { router as user } from "./src/routes/user.routes";
import cookieParser from "cookie-parser";
import session, { SessionOptions, Session } from "express-session";

const app: Express = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

const sessionOptions: SessionOptions = {
  secret: "session-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
};
app.use(session(sessionOptions));

//Routers connection
app.use("/auth", user);

export { app };
