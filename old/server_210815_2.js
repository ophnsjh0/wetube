// const express = require("express");
// const app = express();

import express from "express";
import morgan from "morgan"

const PORT = 4000;

const app = express();

const dev = morgan("dev");
const combine = morgan("combined");
const short = morgan("short");
const tiny = morgan("tiny");
const common = morgan("common");

const home = (req, res) => res.send("<h1>hello!!!</h1>");

const login = (req, res) => res.send("Login Good ~ !!!");

app.use(dev);
app.use(combine);
app.use(short);
app.use(tiny);
app.use(common);
app.get("/", home);
app.get("/login", login);

const handleListening = () => console.log(`Server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);