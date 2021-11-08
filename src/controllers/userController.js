import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle : "Join" });
export const postJoin = async(req, res) => {
    const { name, email, username, password, password2, location } = req.body
    const pageTitle = "Join"
    if (password !== password2) {
        return res.status(400).render("join", {pageTitle,
            errorMessage : " Password confirmation does not match.",});
    };
    const exists = await User.exists( {$or: [ { username }, { email } ]} );
    if (exists) {
        return res.status(400).render("join", {pageTitle,
        errorMessage : " This username/email is already taken.",});
    };

    // const usernameExists = await User.exists({ username });
    // if (usernameExists){
    //     return res.render("join", { pageTitle, 
    //     errorMessage : "This username is already taken.", });
    // }
    // const emailExists = await User.exists({ email });
    // if (emailExists){
    //     return res.render("join", { pageTitle, 
    //     errorMessage : "This email is already taken.", });
    // }
    try{
        await User.create({
            email,
            username,
            password,
            name,
            location,
        });
        return res.redirect(`/login`);
    } catch (error){
        return res.status(400).render("join", {pageTitle: "Join", 
        errorMessage: error.message,}); 
    }
};

export const getLogin = (req, res) => res.render("login", {pageTitle : "Login"});
export const postLogin = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username });
    const pageTitle = "Login";
    // const exists = await User.exists({username});
    // check if account exists
    if(!user){
        return res.status(400).render("login", {pageTitle,
        errorMessage : " An account with this username does not exists.",});
    };
    // check if password correct
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login", {pageTitle,
        errorMessage : " Wrong password.",});
    };
    return res.redirect(`/`);
};


export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("See User");
export const logout = (req, res) => res.send("Log Out");
