import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
const app = express();

const corsOptions = {
    origin:'https://front-end-teal-eta.vercel.app/',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

export default app;