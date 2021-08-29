import Video from "../models/Video";

export const home = async(req, res) => {        
        const videos = await Video.find({});
        console.log(videos);
        return res.render("home", { pageTitle: "Home", videos }); 
                    
}

export const watch = (req, res) => {
    const id = req.params.id;
    const video = videos[id-1];
    return res.render("watch", { pageTitle: `Watching` });
};

export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id-1];
    return res.render("edit", { pageTitle:`Editing` }); 
};

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body; 
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
    await Video.create({
        title: title,
        description: description,
        creatAt: Date.now(),
        hashtags: hashtags.split(',').map(word => `#${word}`),
        meta: {
            views: 0,
            rating: 0,
        },
    });
    return res.redirect(`/`);
}




