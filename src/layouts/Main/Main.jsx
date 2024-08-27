import React from 'react';
import Navbar from '../../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../Pages/Shared/Footer/Footer';

const Main = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar></Navbar>
            <main className='flex-1 w-full md:max-w-screen-xl mx-auto'>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default Main;