// const express = require("express");
// const app = express();

import express from "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} ${req.cookie}`) 
    next();
}

const privateMiddleware = (req, res, next) => {
    const url = req.url;
    
    if (url === "/protected"){
        return res.send("<h1>Not Allowed</h1>");
    }
    console.log("allowed, you may continue")
    next();
}

const handleProtected = (req, res) => {
    return res.send("Welcome to the private lounge.");
}

const handleHome = (req, res) => {
    return res.send("<h1>i still love you</h1>");
};

const handleLogin = (req, res) => {
    return res.send({message: "Login here."});
};

app.use(logger);
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/protected", handleProtected);
app.get("/login", handleLogin);

const handleListening = () => console.log(`Server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);




