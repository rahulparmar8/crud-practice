import express from "express";
import connectDB from "./src/db/connectdb.js";
import path from "path";
import web from "./src/routes/web.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import session from "express-session";
const app = express();
const port = 3001;
const DATABASE_URL = "mongodb://localhost:27017/myapp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Session
app.use(
  session({
    secret: "imkey",
    resave: false,
    saveUninitialized: true,
  })
);

// Database connection
connectDB(DATABASE_URL);

// body parts middleware
app.use(express.urlencoded({ extended: false }));

//set Template Enging
app.use(express.static("views"));
app.use(express.static(path.join(__dirname, "assets")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Routes
app.use("/student", web);

app.listen(port, () => {
  console.log(`server is runing... ${port}`);
});
