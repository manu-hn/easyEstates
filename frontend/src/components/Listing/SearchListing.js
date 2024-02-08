import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { QUERY_SEARCH_URL } from '../../utils/Constants';
import axios from 'axios';

const SearchListing = () => {
    const [totalListings, setTotalListings] = useState();
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [sideBarFormData, setSideBarFormData] = useState({
        search: "",
        locationType: "all",
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'createdAt',
        order: 'desc',
    });

    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchFromURL = urlParams.get('search', sideBarFormData?.search);
        const locationTypeFromURL = urlParams.get('locationType', sideBarFormData?.locationType);
        const typeFromURL = urlParams.get('type', sideBarFormData?.type);
        const parkingFromURL = urlParams.get('parking', sideBarFormData?.parking);
        const furnishedFromURL = urlParams.get('furnished', sideBarFormData?.furnished);
        const offerFromURL = urlParams.get('offer', sideBarFormData?.offer);
        const sortFromURL = urlParams.get('sort', sideBarFormData?.sort);
        const orderFromURL = urlParams.get('order', sideBarFormData?.order);


        if (searchFromURL || locationTypeFromURL
            || typeFromURL || parkingFromURL
            || furnishedFromURL || offerFromURL
            || sortFromURL || orderFromURL) {
            setSideBarFormData({
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

                const res = await axios.get(QUERY_SEARCH_URL+"?"+searchQuery);
                setListings(res?.data?.listings);
                setTotalListings(res?.data?.total);
               console.log(res?.data?.listings)
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        searchListingsBasedOnQuery()

    }, [location.search])

    const handleDataChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSideBarFormData({ ...sideBarFormData, type: e.target.id })
        }
        if (e.target.id === 'search') {
            setSideBarFormData({ ...sideBarFormData, search: e.target.value })
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSideBarFormData({
                ...sideBarFormData, [e.target.id]: e.target.checked
                    || e.target.checked === 'true' ? true : false
            })
        }
        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'createdAt';
            const order = e.target.value.split('_')[1] || 'desc';
            setSideBarFormData({ ...sideBarFormData, sort, order });
        }
        if (e.target.id === 'locationType') {
            setSideBarFormData({ ...sideBarFormData, [e.target.id]: e.target.value })
        }

    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('search', sideBarFormData?.search);
        urlParams.set('locationType', sideBarFormData?.locationType);
        urlParams.set('type', sideBarFormData?.type);
        urlParams.set('parking', sideBarFormData?.parking);
        urlParams.set('furnished', sideBarFormData?.furnished);
        urlParams.set('offer', sideBarFormData?.offer);
        urlParams.set('sort', sideBarFormData?.sort);
        urlParams.set('order', sideBarFormData?.order);
        const searchQuery = urlParams.toString();
        navigate(`/fetch?${searchQuery}`);

    }
    return (
        <div className='flex flex-col md:flex-row mt-2'>
            <div className="border-b-2 md:border-r-2 md:min-h-screen p-3 max-w-lg">
                <form onSubmit={handleFormSubmit} className='flex flex-col gap-8 justify-start'>
                    <div className='flex items-center justify-between gap-2 px-6 py-1 w-full'>
                        <label htmlFor="search" className=''>Search: </label>
                        <input type="text" name="search" id="search" value={sideBarFormData?.search} onChange={handleDataChange}
                            className='border outline-none rounded-lg p-2 w-full'
                            placeholder='Search Here...' />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center px-6 py-1'>
                        <label htmlFor="">Type :</label>
                        <div className='flex gap-3'>
                            <input type="checkbox" id='all' name='all' onChange={handleDataChange}
                                checked={sideBarFormData?.type === "all"}
                                className='w-5' />
                            <span>Rent & Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" name='sale' id='sale' className='w-5'
                                onChange={handleDataChange} checked={sideBarFormData?.type === 'sale'} />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='rent' name='rent' className='w-5'
                                onChange={handleDataChange} checked={sideBarFormData?.type === 'rent'} />
                            <span>Rent</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type="checkbox" id='offer' className='w-5' name='offer'
                                onChange={handleDataChange} checked={sideBarFormData?.offer} />
                            <span>Offer</span>
                        </div>

                    </div>
                    <div className='flex gap-2 flex-wrap items-center px-6 py-1'>
                        <label htmlFor="">Amenities :</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='parking' className='w-5' name='parking'
                                onChange={handleDataChange} checked={sideBarFormData?.parking} />
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='furnished' className='w-5' name='furnished'
                                onChange={handleDataChange} checked={sideBarFormData?.furnished} />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className='flex px-6 py-1 items-center gap-2'>
                        <label htmlFor="locationType">Property Type :  </label>
                        <select onChange={handleDataChange}
                            className='border outline-none rounded-lg py-2 px-6' id="locationType" name='locationType'>
                            <option value="All">All</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Residential">Residential</option>

                        </select>
                    </div>
                    <div className='flex px-6 py-1 items-center gap-2'>
                        <label htmlFor="sort">Sort Properties :</label>
                        <select onChange={handleDataChange} defaultValue={'createdAt_desc'} className='border outline-none rounded-lg p-2 ' id="sort_order">
                            <option value="regularPrice_desc">Price high to low</option>
                            <option value="regularPrice_asc">Price low to high</option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>
                    <button className='text-white bg-slate-800 py-2 text-center w-full rounded-md'>Search</button>
                </form>
            </div>
            <div className="w-full">
                <h1 className='text-3xl font-semibold border-b px-8 p-3 '>Listings</h1>

            </div>
        </div>
    )
}

export default SearchListing