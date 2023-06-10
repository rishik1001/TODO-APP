import express from "express";
const router = express.Router();
import { getAllUsers, getUserDetails, register,login, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
router.get("/all",getAllUsers);
router.post("/new",register);
router.post("/login",login);
router.get("/logout",logout);
router.get("/me",isAuthenticated,getUserDetails)
export default router;
