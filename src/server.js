// const express = require("express");
// const app = express();

import express from "express";
import morgan from "morgan"
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";



const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + '/src/views')
app.use(logger);
app.use(express.urlencoded({ extended: true })); //URL 인코더 미들웨어 
app.use(session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/wetube" }),
    })
);
// cookie 정보
// app.use((req, res, next) => {
//     console.log(req.headers);
//     next();
// });
// session store 정보 
// app.use((req, res, next) => {
//     req.sessionStore.all((error, sessions) => {
//         req.session.potato += 1;
//         console.log(sessions);
//         next();
//     })
// });
// session 정보 웹 출력 
// app.get("/add-one", (req, res, next) => {
//     return res.send(`${req.session.id}`);
// });
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;

