import express, { Express, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import { router as user } from "./src/routes/user.routes";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

//Routers connection
app.use("/auth", user);

export { app };
