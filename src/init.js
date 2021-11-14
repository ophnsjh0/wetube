import "dotenv/config";
import "./db.js";
import "./models/Video";
import app from "./server";

const PORT = 4000;

const handleListening = () => console.log(`🆗 Server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);