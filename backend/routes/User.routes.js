import express from "express";
import { userGoogleAuthentication, userLogin, userSignup } from "../controllers/User.controller.js";

const router=express.Router();


router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/google-auth', userGoogleAuthentication);

export default router;