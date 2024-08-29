import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/login";
import SignUp from "../Pages/Auth/SignUp";
import Dashboard from "../layouts/Dashboard/Dashboard";
import AddCamp from "../Pages/DashboardPages/AddCamp/AddCamp";
import ManageCamp from "../Pages/DashboardPages/ManageCamp/ManageCamp";
import RegisteredCamp from "../Pages/DashboardPages/RegisteredCamp/RegisteredCamp";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import AvailableCamp from "../Pages/AvailableCamp/AvailableCamp";
import UpdateManageCamp from "../Pages/DashboardPages/UpdateManageCamp/UpdateManageCamp";
import axios, { Axios } from "axios";
import CampDetails from "../Pages/AvailableCamp/CampDetails";
import AllParticipants from "../Pages/DashboardPages/AllParticipants/AllParticipants";
import AdminRoute from "../PrivateRoutes/AdminRoute";
import RegisterCamp from "../Pages/DashboardPages/Participants/RegisterCamp/RegisterCamp";
import Payment from "../Pages/DashboardPages/Participants/Payment/Payment";
import ParticipantProfile from "../Pages/DashboardPages/Participants/ParticipantProfile/ParticipantProfile";
import PaymentHistory from "../Pages/DashboardPages/Participants/PaymentHistory/PaymentHistory";
import OrganizerProfile from "../Pages/DashboardPages/OrganizerProfile/OrganizerProfile";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/', 
                element: <Home></Home>,
            },
            {
                path: '/login', 
                element: <Login></Login> ,
            },
            {
                path: '/signup', 
                element: <SignUp></SignUp>,
            },
            {
                path: '/available-camps', 
                element: <AvailableCamp></AvailableCamp> ,
            },
            {
                path: '/camp-details/:id', 
                element: <CampDetails></CampDetails> ,
                loader: ({params})=> axios.get(`http://localhost:5000/manage-camp/${params.id}`),
            },
            {
                path: '/contact-us', 
                element: <PrivateRoute><p>Contact plzzzzz</p></PrivateRoute>,
            },

        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'register-camp',
                element: <RegisterCamp></RegisterCamp>,
            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>,
                loader: ({params})=> axios.get(`http://localhost:5000/registered-camp/${params.id}`)
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'participantProfile',
                element: <ParticipantProfile></ParticipantProfile>
            },
            // admin's
            {
                path: 'add-camp',
                element:  <AdminRoute><AddCamp></AddCamp></AdminRoute>
            },
            {
                path: 'organizer-profile',
                element:  <AdminRoute><OrganizerProfile></OrganizerProfile></AdminRoute>
            },
            {
                path: 'manage-camp',
                element: <AdminRoute><ManageCamp></ManageCamp></AdminRoute>
            },
            {
                path: 'manage-Camp/update-manage-camp/:id',
                element: <AdminRoute><UpdateManageCamp></UpdateManageCamp></AdminRoute>,
                loader: ({params})=> axios.get(`http://localhost:5000/manage-camp/${params.id}`),
            },
            {
                path: 'manage-register-camp',
                element: <RegisteredCamp></RegisteredCamp>
            },
            {
                path: 'participants',
                element: <AllParticipants></AllParticipants>
            },
        ]
    }
]) 