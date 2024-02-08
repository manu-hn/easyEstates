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

export const deleteListing = async (req, res, next) => {
    try {
        const { id } = req.params;
        const isListingAvailable = await ListingModel.findById({ _id: id });

        if (!isListingAvailable) {
            return res.status(404).json({ error: true, message: ` Listing Not Found` });
        }

        if (req.user?.uid !== isListingAvailable.userRef) {
            return res.status(404).json({ error: true, message: `You are not Authorized` });
        }

        await ListingModel.findByIdAndDelete({ _id: id });
        return res.status(OK).json({ error: false, message: `Listing Deleted Successfully.` })
    } catch (error) {
        next(error);
    }
}

export const updateListings = async (req, res, next) => {
    try {
        const { id } = req.params;

        const isListingAvailable = await ListingModel.findById({ _id: id });

        if (!isListingAvailable) {
            return res.status(404).json({ error: true, message: ` Listing Not Found` });
        }

        if (req.user?.uid !== isListingAvailable.userRef) {
            return res.status(404).json({ error: true, message: `You are not Authorized` });
        }

        const updatedListing = await ListingModel.findByIdAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
        return res.status(200).json({ error: false, message: `Listing Updated Successfully`, updatedListing });
    } catch (error) {
        next(error);
    }
}

export const getListingById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const singleListing = await ListingModel.findById({ _id: id });

        if (!singleListing) {
            return res.status(404).json({ error: true, message: ` Listing Not Found` });
        }

        return res.status(200).json({ error: false, singleListing });

    } catch (error) {
        next(error);
    }
};

export const fetchAllListings = async (req, res, next) => {
    try {
        
        const { search, limit, start, offer, furnished, parking, sort, order, type, locationType } = req.query;
      
        const options = {
            skip: (parseInt(start) - 1) * parseInt(limit),
            limit: (parseInt(limit))
        }

        let queryObject = {};
        if (search) {
            queryObject = { title: { $regex: search, $options: 'i' } }
        }

        if (offer) {
            const finder = offer === 'true' ? true : false;
            queryObject = { ...queryObject, offer: { $in: [finder] } }
        }

        if (furnished) {
            const finder = furnished === 'true' ? true : false;
            queryObject = { ...queryObject, furnished: { $in: [finder] } }
        }

        if (parking) {
            const finder = parking === 'true' ? true : false;
            queryObject = { ...queryObject, parking: { $in: [finder] } }
        }
        if (type) {
            const finder = type === 'rent' ? 'rent' : 'sale';
            queryObject = { ...queryObject, type: { $in: [finder] } }
        }
        if (locationType) {
            const finder = locationType === 'Residential' ? 'Residential' : 'Commercial';
            queryObject = { ...queryObject, "address.zipcode.location_type": { $in: [finder] } }
        }
        const listings = await ListingModel.find(queryObject, {}, options).sort({ [sort]: order === 'desc' ? -1 : 1 });

        return res.status(OK).json({ error: false, total: listings?.length, listings })
    } catch (error) {
        next(error)
    }
}
