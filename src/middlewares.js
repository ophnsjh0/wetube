import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    // console.log(req.session);
    // if(req.session.loggedIn){
    //     res.locals.loggedIn = true
    // }
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {};
    // console.log(res.locals);
    next();
}

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    } else {
        req.flash("error", "Not authorized");
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    } else {
        req.flash("error", "Not authorized");
        return res.redirect("/");
    }
};

export const uploadVideo = multer({ dest: "uploads/video", 
    limit: {fileSize : 10000000 } });

export const uploadAvatar = multer({ dest: "uploads/avatar",
    limit: {fileSize : 3000000 } });

