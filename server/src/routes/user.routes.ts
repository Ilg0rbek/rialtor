import { Router } from "express";
import {
  deleted,
  findAll,
  google,
  login,
  logout,
  register,
  update,
} from "../controllers/user.controller";
import { checkTokenExpired } from "../middleware/auth.middleware";

export const router = Router();

router.get("/users", checkTokenExpired, findAll);
router.post("/register", register);
router.post("/login", login);
router.post("/google", google);
router.post("/logout", logout);
router.patch("/update/:id", checkTokenExpired, update);
router.delete("/delete/:id", checkTokenExpired, deleted);
