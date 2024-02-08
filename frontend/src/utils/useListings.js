import axios from 'axios';
import React, { useState } from 'react';
import jsCookie from 'js-cookie';
import { DELETE_LISTING_URL, GET_LISTINGS_URL, GET_SINGLE_LISTINGS } from './Constants';


const useListings = () => {

    const [showListingsError, setShowListingsError] = useState(null);

    const getAllListings = async (uid) => {
        try {
            const response = await axios.get(GET_LISTINGS_URL + `${uid}`, { headers: { Authorization: jsCookie.get('token') } });

            return response.data;
        } catch (error) {
            setShowListingsError(error.message)
        }
    }

    const deleteListing = async (lid) => {
        try {
            let token = jsCookie.get('token');  //retrieve the jwt token stored in cookies

            if (!token) {
                throw new Error("No Authorization Token Found!");
            } else {

                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                };

                const response = await axios.delete(DELETE_LISTING_URL + `${lid}`, config);
                console.log(response);
                return response.data;
            }

        } catch (error) {
            console.log(error.message);
            alert(`Delete Listing Failed! `);
        }
    }

    const fetchListingById = async (lid) => {
        let token = jsCookie.get('token');
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        try {

            const response = await axios.get(GET_SINGLE_LISTINGS + lid);
            return response.data;
        } catch (error) {
            console.log(error);

        }
    }

    

    return {
        getAllListings, showListingsError, deleteListing, fetchListingById, 
    }
}

export default useListings