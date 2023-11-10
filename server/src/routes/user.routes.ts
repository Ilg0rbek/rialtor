import { Router } from "express";
import {
  findAll,
  login,
  logout,
  register,
} from "../controllers/user.controller";

export const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/log-out", logout);
router.get("/users", findAll);
