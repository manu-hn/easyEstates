import express from "express";
import { config } from "dotenv";
import "./connection/Database.connection.js";
import UserRouter from "./routes/User.routes.js";
import { StatusCodes } from "http-status-codes";
import cors from "cors";
import cookieParser from "cookie-parser";

config();

const { BAD_REQUEST } = StatusCodes;


const app = express();

app.use(cors({
    origin: 'http://localhost:1234',
    credentials: true,
}))
app.use(express.json());

app.use(cookieParser())

app.use(`/api/estates`, UserRouter);

app.use("*", (req, res, next) => {
    res.status(BAD_REQUEST).json({ error: true, message: "Error Page Not Found" })
})


app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`)
})