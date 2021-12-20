import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    credentials: {
      accessKeyId: process.env.AWS_ID,
      secretAccessKey: process.env.AWS_SECRET,
    }
  });
  
const isHeroku = process.env.NODE_ENV === "production";
  
  
const s3ImageUploader = multerS3({
    s3: s3,
    bucket: "wetube-shinbi/images",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
  });
  
const s3VideoUploader = multerS3({
    s3: s3,
    bucket: "wetube-shinbi/videos",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
  });


export const localsMiddleware = (req, res, next) => {
    // console.log(req.session);
    // if(req.session.loggedIn){
    //     res.locals.loggedIn = true
    // }
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {};
    res.locals.isHeroku = isHeroku;
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

export const uploadVideo = multer({
    dest: 'uploads/avatars/', limits: {
      fileSize: 30000000,
    },
    storage: isHeroku ? s3VideoUploader : undefined,
  });

export const uploadAvatar = multer({
    dest: "uploads/videos/", limits: {
      fileSize: 10000000,
    },
    storage: isHeroku ? s3ImageUploader : undefined,
  });

