// const express = require("express");
// const app = express();
// console.log(process.env.COOKIE_SECRET, process.env.DB_URL);
import express from "express";
import morgan from "morgan"
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";



const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + '/src/views')
app.use(logger);
app.use(express.urlencoded({ extended: true })); //URL 인코더 미들웨어 
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     maxAge: 20000,
    // },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    
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
app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;

