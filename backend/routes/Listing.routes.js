import express from 'express';
import { createListings, getListings } from '../controllers/Listings.controller.js';
import { userAuthByToken } from '../utils/userAuth.js';


const router = express.Router();

router.post('/create', userAuthByToken, createListings);
router.get('/get-listings/:id', userAuthByToken, getListings);

export default router;