import express from "express";
import connectDB from "./db.js"
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./Routes/authRoutes.js";
import courseRoute from "./Routes/courseRoutes.js";
import projectRoute from "./Routes/projectRoutes.js"
dotenv.config();  

const app = express();
const PORT = 8000;

connectDB();

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/course',courseRoute)
app.use('/api/v1/projects', projectRoute);

app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`
  );
});
