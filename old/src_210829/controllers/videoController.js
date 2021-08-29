import Video from "../models/Video";

/* find 함수 객체 화 예시 
    const handleSearch = (error, videos) => {
       console.log("error", error);
       console.log("videos", videos)
    }
*/

/* callback 스타일 예시 
export const home = (req, res) => {
    console.log("start") -> callback 예시 1
     Video.find({}, (error, videos) => {
        console.log("finished search"); // callback 예시 3
        console.log("error", error);
        console.log("videos", videos);
        return res.render("home", { pageTitle: "Home", videos: [] });
     });
    // Video.find({}, handleSearch); -> find 함수 객체 화 
    console.log("Finished first"); // callback 예시 2   
};
*/

/* promice 스타일 
export const home = async(req, res) => {
    try{
        const videos = await Video.find({});
        return res.render("home", { pageTitle: "Home", videos: [] });             
    } catch(error){
        return res.render("server-error", {error});        
    };
}
*/

export const home = async(req, res) => {
        const videos = await Video.find({});
        return res.render("home", { pageTitle: "Home", videos: [] });             
}

export const watch = (req, res) => {
    const id = req.params.id;
    // console.log(id); 
    const video = videos[id-1];
    // console.log(video);
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
    // console.log(req.body);
    // console.log(title);
    // const video = videos[id-1];
    // video.title = title;    
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "UpLoad Video"});
}

export const postUpload = (req, res) => {
    // const title = req.body.title;
    const { title } = req.body;
    console.log(req.body);
    return res.redirect(`/`);
}




