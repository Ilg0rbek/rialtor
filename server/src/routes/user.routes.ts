import { Router } from "express";
import {
  findAll,
  google,
  login,
  logout,
  register,
  update,
} from "../controllers/user.controller";
import { checkTokenExpired } from "../middleware/auth.middleware";

export const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", google);
router.patch("/update/:id", checkTokenExpired, update);
router.post("/logout", logout);
router.get("/users", checkTokenExpired, findAll);
