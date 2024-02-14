import React, { useEffect, useState } from 'react';
import Header from "./Header.js";
import { Link, } from 'react-router-dom';
import axios from 'axios';
import { QUERY_SEARCH_URL } from '../../utils/Constants.js';
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css';
import ListingItem from '../Listing/ListingItem.js';

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);


  const fetchSaleListings = async () => {

    try {
      const response = await axios.get(`${QUERY_SEARCH_URL}type=sale&limit=4`);
      

      setSaleListings(response?.data?.listings);
     
    } catch (error) {
      console.log(error);
    }
  }
  const fetchRentListings = async () => {

    try {
      const response = await axios.get(`${QUERY_SEARCH_URL}type=rent&limit=4`);
    
      setRentListings(response?.data?.listings)
      fetchSaleListings();
    } catch (error) {
      console.log(error);
    }
  }
  const fetchOfferListings = async () => {

    try {
      const response = await axios.get(`${QUERY_SEARCH_URL}offer=true&limit=4`);
      setOfferListings(response?.data?.listings);
      fetchRentListings();
     
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOfferListings();
    
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 py-32 px-4 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Your Home <span className='text-slate-500'>Awaits:</span> <br />Explore, Discover, Own</h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          At easyEstates, We Pave the Way for Your Home Quest, Ensuring a Fast, Easy, and Incredibly Comfortable Expedition.
        </div>
        <Link className='text-xs sm:text-sm font-bold text-blue-500 hover:underline' to={`/fetch?`}>Let&apos;s  Get Started!...</Link>
      </div>
      <CCarousel className='w-full' controls indicators dark>
        {
          offerListings && offerListings.length > 0 && (
            offerListings?.map((listing, index) => {
              return (
                <CCarouselItem key={listing._id}>
                  <CImage className="w-full h-[32rem]" src={listing.imageURLs[1 || 0]} alt={`Slide ${index + 1}`} />
                </CCarouselItem>
              )
            })
          )
        }
      </CCarousel>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings?.length > 0 && (
            <div className=''>
              <div className='my-5'>
                <h1 className="font-bold text-xl text-slate-700 sm:text-2xl">Recent Offers</h1>
                <Link className='text-sm text-blue-700 hover:underline' to={`/fetch?offer=true`}>Show more offers</Link>
              </div>
              <div className='flex flex-wrap gap-4 justify-between'>
                {
                  offerListings?.map((listing) => {
                    return <ListingItem listing={listing} key={listing?._id} />
                  })
                }
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings?.length > 0 && (
            <div className=''>
              <div className='my-5'>
                <h1 className="font-bold text-xl text-slate-700 sm:text-2xl">Recent Properties for Rent</h1>
                <Link className='text-sm text-blue-700 hover:underline' to={`/fetch?type=rent`}>Show more Properties for rent</Link>
              </div>
              <div className='flex flex-wrap gap-4 justify-between'>
                {
                  rentListings?.map((listing) => {
                    return  <ListingItem listing={listing} key={listing?._id} />
                  })
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings?.length > 0 && (
            <div className=''>
              <div className='my-5'>
                <h1 className="font-bold text-xl text-slate-700 sm:text-2xl">Recent Properties for Sale</h1>
                <Link className='text-sm text-blue-700 hover:underline' to={`/fetch?type=sale`}>Show more Properties for sale</Link>
              </div>
              <div className='flex flex-wrap gap-4 justify-between'>
                {
                  saleListings?.map((listing) => {
                    return  <ListingItem listing={listing} key={listing?._id} />
                  })
                }
              </div>
            </div>
          )
        }
       
      </div>
    </div>
  )
}

export default Home