import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListingItem from './ListingItem';

const SearchListings = () => {
  const [totalListings, setTotalListings] = useState();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [sideBarData, setSideBarData] = useState({
    search: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
    locationType: 'Commercial',
  });



  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSideBarData({ ...sideBarData, type: e.target.id });
    }
    if (e.target.id === 'search') {
      setSideBarData({ ...sideBarData, search: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSideBarData({
        ...sideBarData,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }
    if (e.target.id === 'locationType') {
      setSideBarData({ ...sideBarData, locationType: e.target.value });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';

      setSideBarData({ ...sideBarData, sort, order });
    }

    // Update URL with the selected filters
    const urlParams = new URLSearchParams();

    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      urlParams.set('type', e.target.id);
    }

    if (e.target.id === 'search') {
      urlParams.set('search', e.target.value);
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      urlParams.set(e.target.id, e.target.checked.toString());
    }

    if (e.target.id === 'locationType') {
      urlParams.set('locationType', e.target.value);
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';

      urlParams.set('sort', sort);
      urlParams.set('order', order);
    }
    const existingParams = new URLSearchParams(location.search);
    existingParams.forEach((value, key) => {
      if (!urlParams.has(key)) {
        urlParams.set(key, value);
      }
    });

    // Combine all parameters and navigate to the updated URL
    navigate(`/fetch?${urlParams.toString()}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchFromURL = urlParams.get('search');
    const locationTypeFromURL = urlParams.get('locationType');
    const typeFromURL = urlParams.get('type');
    const parkingFromURL = urlParams.get('parking');
    const furnishedFromURL = urlParams.get('furnished');
    const offerFromURL = urlParams.get('offer');
    const sortFromURL = urlParams.get('sort');
    const orderFromURL = urlParams.get('order');

    if (
      searchFromURL ||
      locationTypeFromURL ||
      typeFromURL ||
      parkingFromURL ||
      furnishedFromURL ||
      offerFromURL ||
      sortFromURL ||
      orderFromURL
    ) {
      setSideBarData({
        search: searchFromURL || '',
        locationType: locationTypeFromURL || '',
        type: typeFromURL || 'all',
        parking: parkingFromURL === 'true' ? true : false,
        furnished: furnishedFromURL === 'true' ? true : false,
        offer: offerFromURL === 'true' ? true : false,
        sort: sortFromURL || 'createdAt',
        order: orderFromURL || 'desc',
      });
    }

    async function searchListingsBasedOnQuery() {
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const res = await axios.get(`http://localhost:5000/api/listings/fetch?${searchQuery}`);
        setListings(res?.data?.listings);
        setTotalListings(res?.data?.total);
        console.log(res?.data?.listings);
        setLoading(false);
      } catch (error) {

        console.log(error);
        setLoading(false)
      }
    }

    searchListingsBasedOnQuery();
  }, [location.search]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('search', sideBarData?.search);
    urlParams.set('locationType', sideBarData?.locationType);
    urlParams.set('type', sideBarData?.type);
    urlParams.set('parking', sideBarData?.parking.toString());
    urlParams.set('furnished', sideBarData?.furnished.toString());
    urlParams.set('offer', sideBarData?.offer.toString());
    urlParams.set('sort', sideBarData?.sort);
    urlParams.set('order', sideBarData?.order);
    const searchQuery = urlParams.toString();
    navigate(`/fetch?${searchQuery}`);
  };
  // const debounce = (func, delay) => {
  //   let timeoutId;
  //   return function (...args) {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => func.apply(this, args), delay);
  //   };
  // };

  // const debouncedHandleChange = debounce(handleChange, 300); 
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleFormSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search:
            </label>
            <input
              type='text'
              id='search'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sideBarData?.search}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={sideBarData?.type === 'all'}
              />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={sideBarData?.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={sideBarData?.type === 'sale'}
              />
              <span>Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={sideBarData?.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={sideBarData?.parking}
              />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sideBarData?.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to hight</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Property Type:</label>
            <select
              onChange={handleChange}
              defaultValue={'Commercial'}
              id='locationType'
              className='border rounded-lg p-3'
            >
              <option value='Commercial'>Commercial</option>
              <option value='Residential'>Residential</option>
            </select>
          </div>
          <button
            type='submit'
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
          >
            Search
          </button>
        </form>
      </div>
      <div className='p-7  border-b-2 '>
        {
          !loading && totalListings === 0 && listings.length === 0 && (
            <p>No Listings Found</p>
          )
        }
        <h1>{totalListings} No of Listings found !</h1>

        <div className='flex flex-wrap gap-4'>
          {
            !loading && listings && listings.map((listing) => {
              return <Link key={listing._id} to={`/listing/${listing._id}`}><ListingItem listing={listing} /></Link>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default SearchListings;
