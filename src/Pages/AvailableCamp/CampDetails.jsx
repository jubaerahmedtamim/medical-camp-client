import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { useLoaderData, useNavigate } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CampDetails = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { data } = useLoaderData()
    const { campName, campFees, location, date, time, professionalName, details, image_url, _id } = data;

    const handleJoinCamp = (id) => {
        const registeredCamp = {
            cmapId: id,
            email: user?.email,
            participantName: user?.displayName,
            campName,
            campFees,
            image_url,
            payment_status: 'unpaid',
            confirmation_status: 'Pending',
            
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You want to join this camp?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want to Join.!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.post('/registered-camps', registeredCamp)
                console.log(res.data.insertedId);
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Done",
                        text: "You have successfully joined this camp.",
                        icon: "success"
                    });
                    navigate(-1)
                }

            }
        });
    }


    return (
        <div>
            <SectionTitle heading={"Camp Details"} subHeading={"Here is the details of each camp."}></SectionTitle>
            <div className='flex flex-col items-center justify-center my-10 space-y-4'>
                <div className='flex flex-col justify-center items-center space-y-2'>
                    <p>Published On: {date} at {time}</p>
                    <h1 className='text-4xl font-bold'>{campName}</h1>
                    <h3 className='text-xl'>HealthCare Professional Name: {professionalName}</h3>
                    <div className='flex items-center gap-2 text-gray-600'>
                        <FaLocationDot></FaLocationDot>
                        <p>{location}</p>
                    </div>
                    <p>Camp Fees: ${campFees}</p>
                </div>
                <div>
                    <img className='rounded-lg' src={image_url} alt="image of camp" />
                </div>
                <p className=' max-w-screen-2xl md:max-w-screen-md mx-auto'>{details}</p>
                <button onClick={() => handleJoinCamp(_id)} className='btn btn-primary'>Join Camp</button>
            </div>
        </div>
    );
};

export default CampDetails;