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
import axios from "axios";

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
                path: '/available-camps', 
                element: <AvailableCamp></AvailableCamp> ,
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
                path: 'add-camp',
                element: <AddCamp></AddCamp>,
            },
            {
                path: 'manage-camp',
                element: <ManageCamp></ManageCamp>
            },
            {
                path: 'manage-Camp/update-manage-camp/:id',
                element: <UpdateManageCamp></UpdateManageCamp>,
                loader: ({params})=> axios.get(`http://localhost:5000/manage-camp/${params.id}`),
            },
            {
                path: 'manage-register-camp',
                element: <RegisteredCamp></RegisteredCamp>
            },
        ]
    }
]) 