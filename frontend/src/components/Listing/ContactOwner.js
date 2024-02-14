import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jsCookie from 'js-cookie';
import { ESTATE_URL } from "../../utils/Constants.js";
import { Link } from 'react-router-dom';

const ContactOwner = ({ listing }) => {
    const [owner, setOwner] = useState(null);
    const [message, setMessage] = useState('')

    const fetchUser = async () => {
        try {
            let token = jsCookie.get('token');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const response = await axios.get(ESTATE_URL + listing.userRef, config);
          
            setOwner(response.data.data);

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUser();
    }, [listing.userRef])

    return (
        <>
            {
                owner && (
                    <div className='flex flex-col gap-3 mt-8'>
                        <p className=''>Contact <span className='font-bold'>{owner?.fullName}</span> for more details about <span className='font-semibold'>{listing?.title}</span></p>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                            placeholder='Your message here ...' className='p-4 w-full rounded-lg border outline-none '
                            name="" id="" cols="30" rows="3"></textarea>
                        <Link to={`mailto:${owner?.email}?Regarding ${listing?.title}&body=${message}`} className='w-full bg-green-900
                        text-white rounded text-center py-2 '>Send Message</Link>
                    </div>
                )
            }
        </>
    )
}

export default ContactOwner