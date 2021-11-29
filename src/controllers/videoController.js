// import Video, { formatHashtags } from "../models/Video";
import Video from "../models/Video";
import User from "../models/User";

export const home = async(req, res) => {        
        const videos = await Video.find({}).sort({ creatAt : `desc`});
        return res.render("video/home", { pageTitle: "Home", videos }); 
                    
}

export const watch = async (req, res) => {
    const id = req.params.id;   
    const video = await Video.findById(id).populate("owner");
    console.log(video);
    // const owner = await User.findById(video.owner);
    if(video){
        return res.render("video/watch", { pageTitle: video.title, video});
    } 
    return res.render("template/404", { pageTitle: "Video Not Found.!"});    
};

export const getEdit = async(req, res) => {
    const { user: {_id}} = req.session
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video){
        return res.status(404).render("404", { pageTitle: "Video Not Found.!"});
    }
    if (String(video.owner) !== String(_id)){
        return res.status(403).redirect("/");
    }
    return res.render("video/edit", { pageTitle:`Edit : ${video.title}`, video});     
};

export const postEdit = async (req, res) => {
    const { user: {_id}} = req.session
    const { id } = req.params;   
    const { title, description, hashtags } = req.body;
    const video = await Video.findById(id);
    // const video = await Video.exists({ _id: id});
    if (!video){
        return res.status(404).render("template/404", { pageTitle: "Video Not Found.!"});
    } 
    if (String(video.owner) !== String(_id)){
        return res.status(403).redirect("/");
    } 
    await Video.findByIdAndUpdate(id,{
        title,
        description, 
        hashtags: Video.formatHashtags(hashtags),
        });
          
    // else{
    //     video.title = title;
    //     video.description = description;
    //     video.hashtags = hashtags.split(',').map((word) => (word.startsWith("#") ? word :`#${word}`));
    //     await video.save()
    // }  
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("video/upload", {pageTitle: "UpLoad Video"});
}

export const postUpload = async(req, res) => {
    const {user: {_id}} = req.session;
    // const file = req.file;
    const { path } = req.file;
    const { title, description, hashtags } = req.body;
    /* Video db저장 save 방식 
    const video = new Video({
        title: title,
        description: description,
        creatAt: Date.now(),
        hashtags: hashtags.split(',').map(word => `#${word}`),
        meta: {
            views: 0,
            rating: 0,
        },
    });
    await video.save();
    */
   // Video db저장 create 방식 
   try {
    const newVideo = await Video.create({
        videoPath : path,
        title: title,
        description: description,
        owner: _id,
        hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect(`/`);
   } catch(error) {
        return res.status(400).render("video/upload", {pageTitle: "UpLoad Video", errorMessage: error.message,});   
   };
   
};

export const getDelete = async(req, res) => {
    const { user: {_id}} = req.session
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video){
        return res.status(404).render("template/404", { pageTitle: "Video Not Found.!"});
    }
    if (String(video.owner) !== String(_id)){
        return res.status(403).redirect("/");
    } 
    await Video.findByIdAndDelete(id);
    return res.redirect(`/`);
};

export const search = async(req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}`, "i"),
            },
        });
    }
    return res.render("video/search", {pageTitle: "Search", videos});
}



