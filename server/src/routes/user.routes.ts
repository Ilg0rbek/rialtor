import { Router } from "express";
import {
  findAll,
  google,
  login,
  logout,
  register,
} from "../controllers/user.controller";
import { checkTokenExpired } from "../middleware/auth.middleware";

export const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", google);
router.post("/log-out", logout);
router.get("/users", checkTokenExpired, findAll);
