import express from "express";
import {watch, getEdit, postEdit, getUpload, postUpload, getDelete } from "../controllers/videoController"
import { protectorMiddleware, uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(getDelete);
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(uploadVideo.fields([{ name: "video" }, { name: "thumb" }]), postUpload);


export default videoRouter;

