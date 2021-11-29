import express from "express";
import {getEdit, postEdit, profile, logout, startGihubLogin, 
    finishGihubLogin, getChangePassword, postChangePassword} from "../controllers/userController"
import { protectorMiddleware, publicOnlyMiddleware, uploadAvatar } from "../middlewares";


const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadAvatar.single("avatar"), postEdit);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, startGihubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGihubLogin);
userRouter.get("/:id([0-9a-f]{24})", profile);

export default userRouter; 



