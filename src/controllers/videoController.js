let videos = [
    {
        title: "First Video",
        rating : 5,
        comment : 55,
        createdAt : "2 hour ago" ,
        views : 392,
        id : 1
    },
    {
        title: "Second Video",
        rating : 1,
        comment : 93,
        createdAt : "12 hour ago",
        views : 1,
        id : 2
    },
    {
        title: "Third Video",
        rating : 5,
        comment : 30,
        createdAt : "9 hour ago",
        views : 10002342,
        id : 3
    },
];


export const trending = (req, res) => {
    return res.render("home", { pageTitle: "Home" , videos});
};

export const watch = (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const video = videos[id-1];
    // console.log(video);
    return res.render("watch", { pageTitle: `Watching: ${video.title}`, video});
};

export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id-1];
    return res.render("edit", { pageTitle:`Editing: ${video.title}`, video}); 
};

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    // console.log(req.body);
    // console.log(title);
    videos[id-1].title = title;
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
    const newVideo = {
        title: title,
        rating : 0,
        comment : 0,
        createdAt : "just ago" ,
        views : 0,
        id : videos.length + 1, 
    }
    videos.push(newVideo);
    return res.redirect(`/`);
}



