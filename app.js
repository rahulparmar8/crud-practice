import express from "express";
import connectDB from "./src/db/connectdb.js";
import { join } from "path";
import web from "./src/routes/web.js";
const app = express();
const port = 3001;
const DATABASE_URL = "mongodb://localhost:27017/myapp";

// Database connection
connectDB(DATABASE_URL);

// static files
app.use("/student", express.static(join(process.cwd(), "public")));

//set Template Enging
app.set("view enging", ejs);

//Routes
app.use("/student", web);
app.listen(port, () => {
  console.log(`server is runing... ${port}`);
});
