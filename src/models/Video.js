import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, require: true, trim: true, maxLength: 40, uppercase: true },
    description: { type: String, required: true, trim: true, minLength: 20 },
    creatAt: { type: Date, default: Date.now, required: true },
    hashtags: [{ type: String, trim: true, required: true}],
    meta: {
        views: {type: Number, default: 0, required: true },
        rating: {type: Number, default: 0, required: true },
    },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
