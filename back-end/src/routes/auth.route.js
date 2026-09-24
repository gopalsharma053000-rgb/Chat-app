import express from "express";
import { signup , login , logout, updateProfile} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProjection } from "../middleware/arcjet.middleware.js";

const router = express.Router();


router.post("/signup",arcjetProjection,signup);
router.post("/login",arcjetProjection,login);
router.post("/logout",arcjetProjection,logout);

router.put("/update-profile",arcjetProjection,protectRoute,updateProfile);

router.get("/check",arcjetProjection,protectRoute,(req,res)=>{
    res.status(200).json(req.user);
})

export default router;