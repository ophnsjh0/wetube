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
    return res.render("home", {pageTitle: "Home", videos });
};
export const watch = (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const video = videos[id-1];
    // console.log(video);
    return res.render("watch", { pageTitle: `Watching ${video.title}`, video});
};
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit"  });
export const search = (req, res) => res.send("Search Video");
export const deleteVideo = (req, res) => {
   
    res.send("Delete Video");
};
export const upload = (req, res) => res.send("Upload Video");


