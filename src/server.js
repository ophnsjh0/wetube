// const express = require("express");
// const app = express();

import express from "express";
import morgan from "morgan"
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";



const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + '/src/views')
app.use(logger);
app.use(express.urlencoded({ extended: true })); //URL 인코더 미들웨어 
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;

