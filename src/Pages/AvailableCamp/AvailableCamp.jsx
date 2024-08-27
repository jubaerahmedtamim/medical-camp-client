import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import useAvailableCamp from '../../hooks/useAvailableCamp';
import LoadingSpinner from '../../components/LoadingSpinner';
import CampCard from './CampCard';

const AvailableCamp = () => {
    const [availableCamps, isLoading] = useAvailableCamp();
    if(isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <SectionTitle heading={'Available Camps'} subHeading={"Let's find your medical camps."}></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-3 '>
                {
                    availableCamps.map(camp => <CampCard key={camp._id} camp={camp}></CampCard>)
                }
            </div>
        </div>
    );
};

export default AvailableCamp;