import React, { useEffect, useState } from 'react';
import useListings from '../../utils/useListings';
import { useParams } from 'react-router-dom';
import { CCarousel, CCarouselItem, CImage } from "@coreui/react"; // Correct import
import '@coreui/coreui/dist/css/coreui.min.css';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,

    FaShare,
} from 'react-icons/fa';
import { MdBedroomChild } from "react-icons/md";
import { useSelector } from 'react-redux';
import ContactOwner from './ContactOwner';

const Listing = () => {
    const [contactOwner, setContactOwner] = useState(false)
    const { currentUser } = useSelector((store) => store.user)
    const [copied, setCopied] = useState(false);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { fetchListingById } = useListings();
    const { id } = useParams();

    async function fetchById() {
        const res = await fetchListingById(id);
        setListing(res?.singleListing);
        setError(res?.error);
        console.log(res);
        console.log(error);
    }

    useEffect(() => {
        fetchById();
    }, []);

    if (error) {
        return (
            <div>
                <h1 className='text-red-600'>Something went wrong... Please try after some time</h1>
            </div>
        );
    }

    return (
        <main>
            {listing && !loading && !error && (
                <div className='flex justify-center flex-col w-full items-center'>
                    <div className='flex justify-center  w-full border border-black'>
                        <CCarousel className='w-full' controls indicators dark>

                            {listing?.imageURLs?.map((url) => {

                                return (

                                    <CCarouselItem key={url}>
                                        <CImage className=" w-full max-h-[32rem]" src={url} alt="slide 1" />
                                    </CCarouselItem>
                                )
                            })}
                        </CCarousel>
                        <div className='fixed top-[20%] sm:top-[15%] right-[3%] z-10 border rounded-full w-6 h-6 sm:w-12 sm:h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                            <FaShare
                                className='text-slate-500 w-3 h-3 sm:w-12 sm:j-12'
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    setCopied(true);
                                    setTimeout(() => {
                                        setCopied(false);
                                    }, 2000);
                                }}
                            />
                        </div>
                        {copied && (
                            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                                Link copied!
                            </p>
                        )}
                    </div>
                    <div className='w-[90%] sm:w-3/5 '>
                        <h1 className='text-black font-semibold my-2 text-lg sm:text-2xl '>{listing?.title} {'  '}
                            {
                                listing.offer
                                    ? listing.discountPrice.toLocaleString('en-US')
                                    : listing.regularPrice.toLocaleString('en-US')
                            }
                            {listing.type === 'rent' && ' Rs - / month'}
                            {listing.type === 'sale' && ' for property'}
                        </h1>
                        <ul className='flex w-full justify-between my-2 flex-wrap text-sm sm:text-lg'>
                            <span> <FaMapMarkerAlt className='text-green-800 text-sm font-semibold' /> </span>
                            <li className='font-semibold'>  Street :  <span className='font-extralight text-gray-700'>{listing?.address?.street}</span> </li>
                            <li className='font-semibold'>  City :    <span className='font-extralight text-gray-700'>{listing?.address?.city}</span> </li>
                            <li className='font-semibold'>  State :   <span className='font-extralight text-gray-700'>{listing?.address?.state}</span> </li>
                            <li className='font-semibold'>  Pin code : <span className='font-extralight text-gray-700'>{listing?.address?.zipcode?.code}</span></li>
                        </ul>
                        <div className='flex gap-6'>
                            <p className='bg-red-800 w-full max-w-52 text-white text-center text-sm sm:text-lg py-1 rounded-lg '>
                                {listing?.type === 'rent' ? "For Rent" : 'For Sale'}</p>
                            {
                                listing?.offer && (
                                    <p className='bg-green-800 w-full max-w-52 text-sm sm:text-lg text-white text-center py-1 rounded-lg'>₹ {+listing?.discountPrice}rs discount</p>
                                )
                            }
                        </div>
                        <p className="text-gray-600 my-3 text-sm sm:text-lg"><span className='font-semibold text-black'>Description - </span> {listing?.description}</p>
                        <ul className='text-green-800 text-sm font-semibold flex items-start gap-4 sm:gap-6 flex-wrap'>

                            <li className='flex items-center gap-2 whitespace-nowrap '> <MdBedroomChild className='text-lg ' />
                                {listing?.bedrooms?.total > 1 ? `${listing?.bedrooms?.total}beds` : '${listing?.bedrooms?.total}bed'}, </li>

                            <li className='flex items-center gap-2 whitespace-nowrap '> <FaBed className='text-lg ' />
                                {listing?.bedrooms?.guest > 1 ? `${listing?.bedrooms?.guest} guest rooms` : `${listing?.bedrooms?.total}guest room`}, </li>
                            <li className='flex items-center gap-2 whitespace-nowrap '> <FaBath className='text-lg ' /> {listing.bathrooms > 1 ? `${listing?.bathrooms} baths` : `${listing?.bathrooms} bath`}</li>
                            <li className='flex items-center gap-2 whitespace-nowrap '>
                                <FaParking className='text-lg ' /> {listing?.parking ? 'Parking Space Available' : 'No Parking Space Available'}
                            </li>
                            <li className='flex items-center gap-2 whitespace-nowrap '>
                                <FaChair className='text-lg ' /> {listing?.furnished ? `Furnished` : `Un Furnished`}
                            </li>
                        </ul>
                        {
                            currentUser && listing.userRef !== currentUser.uid && !contactOwner &&(
                                <button onClick={()=>setContactOwner(true)} className='bg-slate-800 hover:opacity-95 
                                rounded-lg uppercase text-white py-2 px-3 w-full my-10'>Contact Owner</button>
                            )}

                            {
                                contactOwner && <ContactOwner listing={listing} />
                            }
                    </div>
                </div>
            )}
        </main>
    );
};

export default Listing;
