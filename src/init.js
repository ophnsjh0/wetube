import "regenerator-runtime";
import "dotenv/config";
import "./db.js";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = 4000;

const handleListening = () => console.log(`🆗 Server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);