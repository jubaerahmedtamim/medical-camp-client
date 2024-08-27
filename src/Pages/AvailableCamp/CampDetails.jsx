import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { useLoaderData } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle';

const CampDetails = () => {
    const { data } = useLoaderData()
    const { campName, campFees, location, date, time, professionalName, details, image_url } = data;
    
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
                <button className='btn btn-primary'>Join Camp</button>
            </div>
        </div>
    );
};

export default CampDetails;