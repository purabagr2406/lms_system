import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import courseRoute from ".routes/course.route.js";

dotenv.config({});

//call database connection
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

//apis
app.use("api/v1/course" , courseRoute);

app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
})