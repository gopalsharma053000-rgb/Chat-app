import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
const app = express();

app.set("trust proxy", 1);

const corsOptions = {
    origin:['http://localhost:5173'
        ,'https://front-end-teal-eta.vercel.app'],
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type',"Authorization"],
    credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

export default app;