import express from 'express';
import { createListings } from '../controllers/Listings.controller.js';
import { userAuthByToken } from '../utils/userAuth.js';


const router=express.Router();

router.post('/create',userAuthByToken, createListings);

export default router;