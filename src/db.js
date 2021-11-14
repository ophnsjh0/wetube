
import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
 });

const db = mongoose.connection

const handleError = (error) => console.log("🤬 DB Error", error);
const handelOpen = () => console.log("🆗 Connected to DB");

db.on("error", handleError);
db.once("open", handelOpen);