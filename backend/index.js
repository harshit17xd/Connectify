//const express = require('express');
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config({});


const app = express();

const PORT = process.env.PORT || 5000;

//middleware



app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true,
    // methods: ['GET', 'POST', 'PUT', 'DELETE']
};
app.use(cors(corsOption));



/// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoute)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at port ${PORT}`);
})
