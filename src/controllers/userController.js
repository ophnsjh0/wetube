import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";



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
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect(`/`);
};

// "https://github.com/login/oauth/authorize?client_id=6d9a9f826a4b01be8ab6&allow_signup=false&scope=read:user user:email"
export const startGihubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize"
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: "false",
        scope: "read:user user:email"
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
}

export const finishGihubLogin = async(req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token"
    const config ={
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,   
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (
        await fetch(finalUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })
    ).json();
    // console.log(tokenRequest);
    if ("access_token" in tokenRequest) {
        //access_API 
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`
                }
            })
        ).json();
        console.log(userData);
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`
                }
            })
        ).json();
        console.log(emailData);
    } else {
        return res.redirect("/login");
    }
};


export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("See User");
export const logout = (req, res) => res.send("Log Out");
