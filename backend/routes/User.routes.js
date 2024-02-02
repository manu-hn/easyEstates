import express from "express";
import { deleteUserAccount, updateUserDetails, userGoogleAuthentication, userLogin, userSignup } from "../controllers/User.controller.js";
import { userAuthByToken } from "../utils/userAuth.js";

const router=express.Router();


router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/google-auth', userGoogleAuthentication);
router.post('/update/:id',userAuthByToken,  updateUserDetails);
router.delete('/delete/:id', deleteUserAccount);

export default router;