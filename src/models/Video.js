import mongoose, { Schema } from "mongoose";

// hashtags 함수 처리 & export 
//  export const formatHashtags = (hashtags) => hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));

const videoSchema = new mongoose.Schema({
    title: { type: String, require: true, trim: true, maxLength: 40, uppercase: true },
    videoPath : { type: String, require: true},
    description: { type: String, required: true, trim: true, minLength: 10 },
    creatAt: { type: Date, default: Date.now, required: true },
    hashtags: [{ type: String, trim: true, required: true}],
    meta: {
        views: {type: Number, default: 0, required: true },
        rating: {type: Number, default: 0, required: true },
    },
    owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref:'User'},
});

// hashtags 미들웨어 처리 (기본값)
// videoSchema.pre("save", async function() {
//     this.hashtags = this.hashtags[0].split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
// })

// hashtags 미들웨어 처리 (직접생성)

videoSchema.static("formatHashtags", function(hashtags) {
    return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
