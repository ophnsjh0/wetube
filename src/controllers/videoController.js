import Video from "../models/Video";

export const home = async(req, res) => {        
        const videos = await Video.find({});
        return res.render("home", { pageTitle: "Home", videos }); 
                    
}

export const watch = async (req, res) => {
    const id = req.params.id;
    const video = await Video.findById(id);
    if(video){
        return res.render("watch", { pageTitle: video.title, video});
    } else {
        return res.render("404", { pageTitle: "Video Not Found.!"});
    }
    
};

export const getEdit = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", { pageTitle: "Video Not Found.!"});
    }else{
        return res.render("edit", { pageTitle:`Edit : ${video.title}`, video}); 
    }
    
};

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    const { title, description, hashtags } = req.body;
    if(!video){
        return res.render("404", { pageTitle: "Video Not Found.!"});
    }else{
        video.title = title;
        video.description = description;
        video.hashtags = hashtags.split(',').map((word) => (word.startsWith("#") ? word :`#${word}`));
        await video.save()
    }  
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "UpLoad Video"});
}

export const postUpload = async(req, res) => {
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
    await Video.create({
        title: title,
        description: description,
        hashtags: hashtags.split(',').map((word) => (word.startsWith("#") ? word :`#${word}`)),
    });
    return res.redirect(`/`);
   } catch(error) {
        return res.render("upload", {pageTitle: "UpLoad Video", errorMessage: error.message,});   
   };
   
};




