
import { FaAd, FaBook, FaCalendar, FaEdit, FaEnvelope, FaHome, FaList, FaPaypal, FaShoppingCart, FaUser, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from "../../hooks/useAdmin";


const Dashboard = () => {
    // const [isAdmin] = useAdmin();
    const [isAdmin] = useAdmin();
    return (
        <div className='flex'>
            {/* dashboard side pannel */}
            <div className="w-64 min-h-screen bg-green-300">
                <ul className='menu space-y-2 text-black'>
                    {
                        isAdmin === true
                            ? <>
                                <li> <NavLink to='/dashboard/organizer-profile'> <FaHome></FaHome> Organizer Profile</NavLink></li>
                                <li> <NavLink to='/dashboard/add-camp'> <FaEdit></FaEdit>  Add Camp</NavLink></li>
                                <li> <NavLink to='/dashboard/payment'> <FaPaypal></FaPaypal> Payment History</NavLink></li>
                                <li> <NavLink to='/dashboard/manage-Camp'> <FaList></FaList> Manage Camp</NavLink></li>
                                <li> <NavLink to='/dashboard/manage-register-camp'> <FaBook></FaBook> Manage Registered Camp</NavLink></li>
                                <li> <NavLink to='/dashboard/participants'> <FaUsers></FaUsers> All Participants</NavLink></li>
                            </>
                            : <>
                                <li> <NavLink to='/dashboard/userHome'> <FaHome></FaHome> Analytics</NavLink></li>
                                <li> <NavLink to='/dashboard/participantProfile'> <FaCalendar></FaCalendar>  Participant Profile</NavLink></li>
                                <li> <NavLink to='/dashboard/register-camp'> <FaPaypal></FaPaypal> Registered Camps</NavLink></li>
                                <li> <NavLink to='/dashboard/cart'> <FaShoppingCart></FaShoppingCart> Payment History </NavLink></li>
                            </>
                    }
                    <div className='divider '></div>
                    {/* shared sidebar */}
                    <li> <NavLink to='/'> <FaHome></FaHome> Home</NavLink></li>
                    <li> <NavLink to='/contact-us'> <FaEnvelope></FaEnvelope> Contact</NavLink></li>
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