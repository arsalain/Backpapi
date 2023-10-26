import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import TrekRoute from "./Routes/Trek.js"
import UserRoute from "./Routes/User.js"
import BatchRoute from "./Routes/Batch.js"
import BookRoute from "./Routes/Book.js"
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to Mongodb")
    }catch(error){
        throw error;
    }
};

app.use(cors())
// app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use("/uploads",express.static('uploads'))
app.use("/trek", TrekRoute);
app.use("/auth",UserRoute)
app.use("/batch",BatchRoute );
app.use("/book",BookRoute );
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });

app.listen(4000, ()=>{
    connect();
    console.log("Connected to backend at port 4000")
})


// const express = require("express")