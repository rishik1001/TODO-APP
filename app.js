import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

config({
    path: "./data/config.env",
});

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true //if false then response headers will not be sent
}))

app.use("/api/v1/users",userRouter); //for saying we are using api
app.use("/api/v1/tasks",taskRouter);

app.get("/", (req, res) => {
    res.send("good");
});
