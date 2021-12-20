import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    credentials:{
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
    }
});

const multerUpload = multerS3({
    s3: s3,
    bucket: 'wetube-shinbi',
    acl: 'public-read',
});


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
    limit: {fileSize : 10000000 },
    storage: multerUpload,
});

export const uploadAvatar = multer({ dest: "uploads/avatar",
    limit: {fileSize : 3000000 }, 
    storage: multerUpload,
});

