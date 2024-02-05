import { StatusCodes } from "http-status-codes";
import ListingModel from "../models/Listings.model.js";

const { OK } = StatusCodes
export const createListings = async (req, res, next) => {
    try {
        // const { } = req.body;
        console.log(req.body)
        const newListing = await ListingModel.create(req.body);
        res.status(OK).json({ error: false, newListing: newListing });
    } catch (error) {
        next(error);
    }
}

export const getListings = async (req, res, next) => {
    try {

        const { id } = req.params;

        if (req?.user?.uid !== id) {
            return res.status(401).json({ error: true, message: `Not Authorized` })
        } else {

            const listings = await ListingModel.find({ userRef: id });

            return res.status(OK).json({ error: false, listings })
        }
    } catch (error) {
        next(error);
    }
}