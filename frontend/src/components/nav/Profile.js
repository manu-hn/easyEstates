import React, { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../firebase.js";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserFailure, updateUserStart, updateUserSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../../redux/slices/userSlice.js';
import axios from 'axios';
import { DELETE_URL, ESTATE_URL, UPDATE_URL } from '../../utils/Constants.js';
import jsCookie from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';



const Profile = () => {
  const navigate = useNavigate()
  const fileRef = useRef(null);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated, loading} = useSelector(store => store.user);
  const [file, setFile] = useState(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log("formData", formData)

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  async function handleFileUpload(file) {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadFile = uploadBytesResumable(storageRef, file);

    uploadFile.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setFilePercentage(Math.round(progress))
      },

      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl })
        })
      },
    )

  }

  function handleFormDataChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    
    try {
      dispatch(updateUserStart());
 
      const response = await axios.post(UPDATE_URL + `${currentUser.uid}`, JSON.stringify(formData), {
        headers: {
          Authorization: jsCookie.get('token'),
          'Content-type': 'application/json'
        }
      })
      console.log("response profile", response)
      setMessage(response.data.message)
      dispatch(updateUserSuccess(response.data.data))
    } catch (error) {
      console.log(error)
      dispatch(updateUserFailure(error?.message))
    }
  }

  const handleDeleteUserAccount = async (e) => {
    e.preventDefault();
    try {
      dispatch(deleteUserStart())
      const response = await axios.delete(DELETE_URL + `${currentUser.uid}`, {
        headers: {
          Authorization: jsCookie.get('token'),
          'Content-type': 'application/json'
        }
      });

      jsCookie.remove('token')
      navigate('/signup');

      dispatch(deleteUserSuccess(response.data))
      console.log(response.data)
    } catch (error) {
      console.log(error)
      dispatch(deleteUserFailure(error?.message));
      setMessage(error?.message);
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await axios.get(ESTATE_URL + 'sign-out');
      setMessage(res.data.message);
      jsCookie.remove('token');
      localStorage.removeItem('persist:root')
      dispatch(signOutUserSuccess(res.data));


    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }
  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-8'>Profile</h1>
      <form className='flex flex-col' onSubmit={handleFormSubmit} >
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} className='h-28 w-28 rounded-full cursor-pointer object-cover self-center mt-4'
          src={formData?.avatar || currentUser.avatar} alt="" />
        <p className='text-center text-xs'>
          {
            fileUploadError ?
              (<span className='text-red-500 '>Error While Uploading (size must be less than 2MB)</span>)
              : (
                filePercentage > 0 && filePercentage < 100 ? (
                  <span className='text-slate-600 '>{`Uploading ${filePercentage}%`}</span>
                ) : (
                  filePercentage === 100 ? (
                    <span className='text-green-600 '>Image Successfully uploaded</span>
                  ) : ("")
                )
              )
          }
        </p>
        <input defaultValue={currentUser.fullName} type="text" name="fullName" id='fullName' placeholder='Full Name' className='my-2 outline-none rounded-lg px-4 py-2' onChange={handleFormDataChange} />
        <input defaultValue={currentUser.username} type="text" name="username" id='username' placeholder='Username' className='my-2 outline-none rounded-lg px-4 py-2' onChange={handleFormDataChange} />
        <input defaultValue={currentUser.email} type="text" name="email" id='email' placeholder='email' className='my-2 outline-none rounded-lg px-4 py-2' onChange={handleFormDataChange} />
        <input defaultValue={currentUser.mobile} type="text" name="mobile" id='mobile' placeholder='mobile' className='my-2 outline-none rounded-lg px-4 py-2' onChange={handleFormDataChange} />
        <input type="password" name="password" id='password' placeholder='password' className='my-2 outline-none rounded-lg px-4 py-2' onChange={handleFormDataChange} />
        <button disabled={loading} type='submit' className='bg-orange-600 uppercase my-2 py-2 rounded-lg text-white hover:opacity-90 disabled:opacity-60'>{loading ? "Updating" : "Update"}</button>
        <Link to={'/create-listing'} className='bg-blue-950 text-white uppercase rounded-lg text-center p-3 hover:opacity-95'>Create Listing</Link>
      </form>
      <div className='flex justify-between mt-6'>
        <span onClick={handleDeleteUserAccount} className='cursor-pointer font-medium text-red-700'>Delete account</span>
        <span onClick={handleSignOut} className='cursor-pointer font-medium text-red-700'>Sign Out</span>
      </div>
      <span className='text-green-500'>{message}</span>
    </div>
  )
}

export default Profile