import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth()
    // console.log(user);
    const navLinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/contact-us'>Contact_us</NavLink></li>
        {
            user && <li><NavLink to='/dashboard'>Dashboard</NavLink></li> 
        }
    </>

    const handleLogout = async() =>{
         await logOut();
         window.location.reload();
    }
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">CampDoc</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {user
                    ? <div className='dropdown dropdown-end'>
                        <div tabIndex={1} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User profile"
                                    src={user?.photoURL} />
                            </div>
                        </div>
                        <ul
                            tabIndex={1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><p>{user?.displayName}</p></li>
                            <li onClick={handleLogout}><a>Logout</a></li>
                        </ul>
                    </div>
                    : <div>
                        
                        <Link to='/login'> <button className="btn btn-accent btn-sm">Login</button> </Link>
                        <Link to='/signup'> <button className="btn btn-secondary btn-sm">Sign Up</button> </Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;