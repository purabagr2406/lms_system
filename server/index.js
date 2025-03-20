import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import courseRoute from "./routes/course.route.js";
import userRoute from "./routes/user.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js"
import courseProgressRoute from "./routes/courseProgrees.route.js"
import mediaRoute from "./routes/media.route.js";

dotenv.config({});

//call database connection
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

//default middleware
app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//     origin:"http:///localhost:8080",
//     credentials:true,
// }))
app.use(cors({
	origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"], // Adjust to match your frontend's URL
	credentials: true, // Allow cookies & authentication headers
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed HTTP methods
	allowedHeaders: ["Content-Type", "Authorization"] // Allowed headers
}));

//apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute)

app.listen(PORT, () => {
	console.log(`Server listen at port ${PORT}`);
})