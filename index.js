import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import blogRouter from "./routers/blogrouter.js";
import dbconnect from "./database/dbconnect.js";
import userRouter from "./routers/userrouter.js";
var app = express();
dbconnect();
app.use(cors({credentials: true,origin:["https://jellyfish-app-2hde2.ondigitalocean.app","http://localhost:5173"]}));
app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1 style='background-color:#f7e2d7 ; height:100vh; display:flex; justify-content:center; align-items:center'>Sima, I Love You &#128150;</h1>");
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.listen(process.env.PORT, () => {
  console.log(`server is listining in port ${process.env.PORT} `);
});
