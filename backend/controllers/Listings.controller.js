import { StatusCodes } from "http-status-codes";
import ListingModel from "../models/Listings.model.js";

const {OK}= StatusCodes
export const createListings = async (req, res, next) => {
    try {
        // const { } = req.body;
        console.log(req.body)
        const newListing=await ListingModel.create(req.body);
        res.status(OK).json({error : false, newListing: newListing});
    } catch (error) {
        next(error);
    }
}