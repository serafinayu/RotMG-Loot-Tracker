import express from "express";
import {
  registerUser,
  loginUser,
  deleteUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.delete("/delete", deleteUser);

export default userRouter;
