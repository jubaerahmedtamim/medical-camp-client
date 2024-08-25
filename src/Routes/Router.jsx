import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/login";
import SignUp from "../Pages/Auth/SignUp";


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

        ]
    }
]) 