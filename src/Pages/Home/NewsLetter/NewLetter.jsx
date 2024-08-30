import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import toast from 'react-hot-toast';

const NewLetter = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        if(e.target.newsletter.value){
            toast.success('Thanks for subscribing us.')
        }
        else{
            toast.error("Provide a valid email.")
        }
    }
    return (
        <div className='my-10'>
            <SectionTitle heading={"NewsLetter"} subHeading={"Stay connected with us? Just email."}></SectionTitle>
            <div className='flex items-center justify-center my-5'>
                <form onSubmit={handleSubscribe} className="join">
                    <input name='newsletter' type='email' className="input input-bordered join-item" placeholder="Email" />
                    <button className="btn join-item rounded-r-full">Subscribe</button>
                </form >
            </div>
        </div>
    );
};

export default NewLetter;