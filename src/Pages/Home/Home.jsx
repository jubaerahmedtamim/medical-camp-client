import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import FeedbackRatings from '../../components/Feedback&Ratings/FeedbackRatings';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner/Banner';
import Feedback from './Feedback/Feedback';
import PopularCamp from './PopularCamp/PopularCamp';
import NewLetter from './NewsLetter/NewLetter';

const Home = () => {
    return (
        <div className=''>

            <Helmet>
                <title>CampDoc | Home</title>
            </Helmet>
            {/* <SectionTitle heading={"Home"} subHeading={'welcome home.'}></SectionTitle> */}
            <Banner></Banner>
            <PopularCamp></PopularCamp>
            <Feedback></Feedback>
            <NewLetter></NewLetter>
        </div>
    );
};

export default Home;