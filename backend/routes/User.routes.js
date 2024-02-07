import express from "express";
import { deleteUserAccount, updateUserDetails, userGoogleAuthentication, userLogin, userSignOut, userSignup, getUserDetails } from "../controllers/User.controller.js";
import { userAuthByToken } from "../utils/userAuth.js";

const router=express.Router();


router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/google-auth', userGoogleAuthentication);
router.post('/update/:id', userAuthByToken, updateUserDetails);
router.delete('/delete/:id', userAuthByToken,deleteUserAccount);
router.get('/sign-out', userSignOut)
router.get('/:id', userAuthByToken, getUserDetails)


export default router;