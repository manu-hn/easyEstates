import React from 'react';
import useListings from '../../utils/useListings';

const DeleteListing = ({ lid, deleteListingStatus, userListings, updateListings }) => {
    const { deleteListing } = useListings()
    const handleListingDelete = async (lid) => {
        try {
            const res = await deleteListing(lid)
            deleteListingStatus(res.message);
            const filteredListings = userListings.filter((listing) => listing._id !== lid);
            updateListings(filteredListings)
            setTimeout(() => {
                deleteListingStatus(" ")
            }, 2000)
        } catch (error) {
            deleteListingStatus('Delete Listing Failed');

            setTimeout(() => {
                deleteListingStatus(" ")
            }, 2000)
        }
    }
    return (
        <><button onClick={() => handleListingDelete(lid)} className='text-red-700'>Delete</button></>
    )
}

export default DeleteListing