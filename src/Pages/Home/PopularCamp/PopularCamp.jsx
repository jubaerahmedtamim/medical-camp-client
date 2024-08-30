import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import useAvailableCamp from '../../../hooks/useAvailableCamp';
import CampCard from '../../AvailableCamp/CampCard';
import { Link } from 'react-router-dom';

const PopularCamp = () => {
    const [availableCamps, isLoading, refetch] = useAvailableCamp();

    return (
        <div className='my-10'>
            <SectionTitle  heading={"Popular Camps"} subHeading={"A few of popular camp is here."}></SectionTitle>
            <div className='grid gap-8 grid-cols-1 md:grid-cols-3 my-10'>
                {
                    availableCamps.slice(0,3).map(camp => <CampCard key={camp._id} camp={camp}></CampCard>)
                }
            </div>
            <div className='flex items-end justify-center'>
            <Link to='/available-camps'><button className='btn btn-primary'>Show All Camps</button></Link>   </div> 
        </div>
    );
};

export default PopularCamp;