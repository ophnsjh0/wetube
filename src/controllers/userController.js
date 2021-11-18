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
            socialOnly: false,
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
    const user = await User.findOne({ username, socialOnly: false });
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
    console.log(tokenRequest);
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
        // console.log(userData);
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`
                }
            })
        ).json();
        console.log(emailData);
        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if (!emailObj){
            return res.redirect("/login");
        };
    // Social Login
    //     const existingUser = await User.findOne({ email: emailObj.email });
    //     if(existingUser){
    //         req.session.loggedIn = true;
    //         req.session.user = existingUser;
    //         return res.redirect(`/`);
    //     } else {
    //         const user = await User.create({
    //             email: emailObj.email,
    //             username: userData.login,
    //             password: "",
    //             name: userData.name,
    //             socialOnly: true,
    //             location: userData.location,
    //         });
    //         req.session.loggedIn = true;
    //         req.session.user = user;
    //         return res.redirect(`/`);
    //     }
    // } else {
    //     return res.redirect("/login");
    // }
       let user = await User.findOne({ email: emailObj.email});
       if(!user){
        user = await User.create({
            avatarUrl: userData.avatar_url,
            email: emailObj.email,
            username: userData.login,
            password: "",
            name: userData.name,
            socialOnly: true,
            location: userData.location,
        });
       } 
       req.session.loggedIn = true;
       req.session.user = user;
       return res.redirect(`/`); 
    } else {
        return res.redirect("/login");
    }
};

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};

export const getEdit = (req, res) => {
    return res.render("edit-profile", {pageTitle : "Edit-Profile"});
}
export const postEdit = async (req, res) => {
    const { session: { user: {_id, username: sessionUsername, email: sessionEmail}  }, 
    body: { email, username, name, location } } = req;
    const pageTitle = "Edit-Profile";
    if(sessionEmail !== email) {
        const existEmail = await User.findOne({email});
        if (existEmail){
            return res.status(400).render("edit-profile", {pageTitle,
                errorMessage : " This email is already taken.",});
        }
    };
    if(sessionUsername !== username){
        const existUsername = await User.findOne({username});
        if (existUsername){
            return res.status(400).render("edit-profile", {pageTitle,
                errorMessage : " This Username is already taken.",});
        }
    };
   
    const updateUser = await User.findByIdAndUpdate(_id, {
        email,
        username,
        name,
        location,
    }, {new: true}
    );
    req.session.user = updateUser;
    // req.session.user = {
    //     ...req.session.user,
    //     name,
    //     email,
    //     username,
    //     location,
    // };
    return res.redirect("/users/edit");
}
export const see = (req, res) => res.send("See User");
