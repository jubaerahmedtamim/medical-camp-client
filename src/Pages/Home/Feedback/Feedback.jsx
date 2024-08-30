import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../components/SectionTitle';
import { TestimonialCard } from './TestimonialCard';

const Feedback = () => {
    const axiosSecure = useAxiosSecure();

    const {data: feedbacks=[]} = useQuery({
        queryKey: ['feedback'],
        queryFn: async()=> {
            const res = await axiosSecure.get('/feedback');
            return res.data
        }
    })

    return (
        <div className='mt-10'>
            <SectionTitle heading={'Testimonials'} subHeading={'See, What our participants say!'}></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-3 justify-center gap-14 my-2 md:my-10'>
                {
                    feedbacks.map(feedback => <TestimonialCard key={feedback._id} feedback={feedback}></TestimonialCard>)
                }
            </div>
        </div>
    );
};

export default Feedback;

