import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutForm from './CheckOutForm';
import { useLoaderData } from 'react-router-dom';

// Todo: add pk
const stripePromise = loadStripe(import.meta.env.VITE_payment_PK);
const Payment = () => {
    const {data} = useLoaderData();
    
    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm data={data}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;