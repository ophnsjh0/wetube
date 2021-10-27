// import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle : "Join" });
export const postJoin = (req, res) => {
    console.log(req.body);
    res.end();
};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login User");
export const see = (req, res) => res.send("See User");
export const logout = (req, res) => res.send("Log Out");
