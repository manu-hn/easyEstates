import express from "express";
import { config } from "dotenv";
import "./connection/Database.connection.js";

config();

const app=express();


app.listen(process.env.PORT, ()=>{
    console.log(`Server is Running on port ${process.env.PORT}`)
})