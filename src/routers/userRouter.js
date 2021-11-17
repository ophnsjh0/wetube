import express from "express";
import {getEdit, postEdit, see, logout, startGihubLogin, finishGihubLogin} from "../controllers/userController"
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";


const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/:id(\\d+)", see);
userRouter.get("/github/start", publicOnlyMiddleware, startGihubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGihubLogin);

export default userRouter; 



