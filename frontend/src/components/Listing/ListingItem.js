import React from 'react';
import { MdLocationOn } from 'react-icons/md'

const ListingItem = ({ listing }) => {


    if (!listing || !listing.imageURLs || !listing.imageURLs[0]) {
        // Return some default content or handle the case where listing or imageURLs are not available
        return null;
    }
    return (
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow w-[15rem] rounded-lg overflow-hidden'>
            <div className='overflow-hidden w-full'>
                <img src={listing?.imageURLs[0] } alt="Listing Image"
                    className='h-[12rem] object-cover hover:scale-110 transition-scale duration-300  sm:h-[10rem] ' />
            </div>
            <div className='p-3 '>
                <p className='truncate text-lg font-semibold text-slate-700'>{listing.title}</p>
                <div className='flex items-center'>
                    <MdLocationOn className='text-red-700 size-7' />
                    <div className='flex w-full justify-between text-sm text-gray-500 truncate'>
                        <p>{listing?.address?.street}</p>
                        <p>{listing?.address?.city}</p>
                        <p>{listing?.address?.state}</p>
                    </div>
                </div>
                <p className='text-sm text-gray-500 line-clamp-2'>{listing?.description}</p>
                <p className='text-slate-500 text-sm mt-2 font-semibold'>
                    ₹ {
                        listing?.offer ? listing?.discountPrice.toLocaleString('en-IN')
                            : listing?.regularPrice.toLocaleString('en-IN')
                    } {
                        listing?.type === 'rent' && "/ Month" 
                    }
                </p>
                <div className=' flex w-full justify-between'>
                    <div className='font-bold text-xs text-slate-700 flex justify-between'>
                        <p>
                            {listing?.bedrooms?.total > 1 ? `${listing?.bedrooms?.total} beds` : `${listing?.bedrooms?.total} bed`}
                        </p>
                       
                    </div>
                    <div className='font-bold text-xs text-slate-700 '>
                    <p>
                            {listing?.bedrooms?.guest > 1 ? `${listing?.bedrooms?.guest} beds` : `${listing?.bedrooms?.guest} guest`}
                        </p>
                    </div>
                    <div className='font-bold text-xs text-slate-700 '>
                        <p>
                        {listing?.bathrooms > 1 ? `${listing?.bathrooms} baths` : `${listing?.bathrooms} bath`}


                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingItem