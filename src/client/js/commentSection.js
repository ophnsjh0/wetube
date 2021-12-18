const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoId = videoContainer.dataset.id;
const videoComments = document.querySelector(".video__comments ul");
// const btn = form.querySelector("button");

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span1 = document.createElement("span");
    // const span2 = document.createElement("span");
    span1.innerText = ` ${text}`;
    const span2 = document.createElement("span");
    span2.className = "deleteBtn";
    span2.innerText = "❌";
    // span2.innerText = `${loggedInUser}`;
    newComment.appendChild(icon);
    newComment.appendChild(span1);
    newComment.appendChild(span2);
    // newComment.appendChild(span2);
    videoComments.prepend(newComment);
  };

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    // const videoId = videoContainer.dataset.id;
    if (text === ""){
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( { text } ),
    });
    textarea.value = "";
    if (response.status === 201) {
        textarea.value = "";
        const { newCommentId } = await response.json();
        addComment(text, newCommentId);
    };
};

const handleDeleteComment = async (event) => {
    if (event.target.className !== "deleteBtn") {
      return;
    }
    // const videoId = videoContainer.dataset.id;
    const li = event.target.closest("li");
    const commentId = li.dataset.id;
  
    const { status } = await fetch(
      `/api/videos/${videoId}/comment/${commentId}`,
      {
        method: "DELETE",
      }
    );
  
    if (status === 200) {
      videoComments.removeChild(li);
    } else {
      alert("Could not remove the comment.");
    }
};

videoComments.addEventListener("click", handleDeleteComment);

if (form){
    form.addEventListener("submit", handleSubmit);
};

