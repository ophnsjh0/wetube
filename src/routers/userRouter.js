import express from "express";
import {edit, remove, see, logout, startGihubLogin, finishGihubLogin} from "../controllers/userController"


const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/:id(\\d+)", see);
userRouter.get("/logout", logout);
userRouter.get("/github/start", startGihubLogin);
userRouter.get("/github/finish", finishGihubLogin);

export default userRouter; 



