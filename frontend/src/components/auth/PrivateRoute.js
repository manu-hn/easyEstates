import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const {  isAuthenticated } = useSelector(store => store.user)
    return  isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoute