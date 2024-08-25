import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import FeedbackRatings from '../../components/Feedback&Ratings/FeedbackRatings';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div className=''>

            <Helmet>
                <title>CampDoc | Home</title>
            </Helmet>
            {/* <SectionTitle heading={"Home"} subHeading={'welcome home.'}></SectionTitle> */}
            <FeedbackRatings></FeedbackRatings>
        </div>
    );
};

export default Home;