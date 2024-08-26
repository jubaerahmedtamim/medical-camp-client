
import { FaAd, FaBook, FaCalendar, FaEdit, FaEnvelope, FaHome, FaList, FaPaypal, FaShoppingCart, FaUser, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from 'react-router-dom';


const Dashboard = () => {
    // const [cart] = useCart();
    // const [isAdmin] = useAdmin();
    const isAdmin = true;
    return (
        <div className='flex'>
            {/* dashboard side pannel */}
            <div className="w-64 min-h-screen bg-green-300">
                <ul className='menu space-y-2 text-black'>
                    {
                        isAdmin
                            ? <>
                                <li> <NavLink to='/dashboard/organizer-profile'> <FaHome></FaHome> Organizer Profile</NavLink></li>
                                <li> <NavLink to='/dashboard/add-camp'> <FaEdit></FaEdit>  Add Camp</NavLink></li>
                                <li> <NavLink to='/dashboard/payment'> <FaPaypal></FaPaypal> Payment History</NavLink></li>
                                <li> <NavLink to='/dashboard/manage-Camp'> <FaList></FaList> Manage Camp</NavLink></li>
                                <li> <NavLink to='/dashboard/manage-register-camp'> <FaBook></FaBook> Manage Registered Camp</NavLink></li>
                                <li> <NavLink to='/dashboard/participants'> <FaUsers></FaUsers> All Participants</NavLink></li>
                            </>
                            : <>
                                <li> <NavLink to='/dashboard/userHome'> <FaHome></FaHome> User Home</NavLink></li>
                                <li> <NavLink to='/dashboard/reservation'> <FaCalendar></FaCalendar>  Reservation</NavLink></li>
                                <li> <NavLink to='/dashboard/payment'> <FaPaypal></FaPaypal> Payment History</NavLink></li>
                                <li> <NavLink to='/dashboard/cart'> <FaShoppingCart></FaShoppingCart> My Cart ({cart.length})</NavLink></li>
                                <li> <NavLink to='/dashboard/review'> <FaAd></FaAd> Add Review</NavLink></li>
                                <li> <NavLink to='/dashboard/booking'> <FaList></FaList> My Booking</NavLink></li>
                            </>
                    }
                    <div className='divider '></div>
                    {/* shared sidebar */}
                    <li> <NavLink to='/'> <FaHome></FaHome> Home</NavLink></li>
                    <li> <NavLink to='/order/salad'> <FaList></FaList>My Booking</NavLink></li>
                    <li> <NavLink to='/order/contact'> <FaEnvelope></FaEnvelope> Contact</NavLink></li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;