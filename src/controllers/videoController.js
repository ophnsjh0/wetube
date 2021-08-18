export const trending = (req, res) => {
    const videos = [
        {
            title: "First Video",
            rating : 5,
            comment : "good Video",
            createdAt : 15,
            views : 392
        },
        {
            title: "Second Video",
            rating : 1,
            comment : "sad Video",
            createdAt : 2,
            views : 200003
        },
        {
            title: "Third Video",
            rating : 5,
            comment : "great Video",
            createdAt : 300,
            views : 10002342
        },
    ];
    return res.render("home", {pageTitle: "Home", videos });
};
export const see = (req, res) => res.render("watch", { pageTitle: "Watch"});
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit"  });
export const search = (req, res) => res.send("Search Video");
export const deleteVideo = (req, res) => {
   
    res.send("Delete Video");
};
export const upload = (req, res) => res.send("Upload Video");


