import express from 'express';
import { createListings, getListings ,deleteListing, updateListings, getListingById} from '../controllers/Listings.controller.js';
import { userAuthByToken } from '../utils/userAuth.js';


const router = express.Router();

router.post('/create', userAuthByToken, createListings);
router.get('/get-listings/:id', userAuthByToken, getListings);
router.get('/get-listing/:id',  getListingById);
router.delete('/delete/:id', userAuthByToken, deleteListing);
router.post('/update/:id', userAuthByToken, updateListings);
export default router;