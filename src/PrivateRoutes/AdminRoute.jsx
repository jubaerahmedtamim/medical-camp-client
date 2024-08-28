import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const [isAdmin, isLoading] = useAdmin();

    if (loading && isLoading) return <LoadingSpinner></LoadingSpinner>

    if (user && isAdmin) return children;

    return <Navigate to='/login' state={{ from: location }} replace />

};

export default AdminRoute;