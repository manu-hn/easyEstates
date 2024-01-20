import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase.js";
import axios from 'axios';
import { ESTATE_URL } from '../../utils/Constants.js';
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/userSlice.js";
const OAuth = () => {
    const dispatch = useDispatch()
    const handleGoogleAuthentication = async () => {
        try {

            const authProvider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const response = await signInWithPopup(auth, authProvider)


            const backendResponse = await axios.post(ESTATE_URL + 'google-auth',
                { name: response.user.displayName, email: response.user.email, image: response.user.photoURL },
                { headers: { 'Content-Type': 'application/json' } });

            dispatch(loginSuccess(backendResponse.data.data));

            console.log(response)

        } catch (error) {
            console.log('Google auth failed ', error)
        }
    }

    return (
        <button type='button' onClick={handleGoogleAuthentication}
            className='bg-red-900 text-white p-3 rounded-lg hover:opacity-85 uppercase'>
            Continue With Google</button>
    )
}

export default OAuth