import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckOutForm = ({ data }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();


    const price = parseInt(data.campFees)
    console.log(price);

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {
                // console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, price])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log("payment error", error);
            setError(error.message)
        } else {
            console.log("payment method", paymentMethod);
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName || 'anonymous',
                },
            }
        })

        if (confirmError) {
            console.log("payment confirm error", confirmError);

        } else {
            console.log("payment intent:", paymentIntent);
            setTransactionId(paymentIntent.id);
            if (paymentIntent.status === 'succeeded') {
                const res = await axiosSecure.patch(`/update-registered-camp/${data._id}`)

                if (res.data.modifiedCount > 0) {
                    // todo: now save payment in the database
                    const payment = {
                        email: user?.email,
                        campName: data.campName,
                        campFees: data.campFees,
                        payment_status: paymentIntent.status,
                        date: new Date(), // need to convert utc,
                        transactionId: paymentIntent.id,
                    }
                    const paymentRes = await axiosSecure.post('/payments', payment);
                    
                    if(paymentRes.data.insertedId){
                        //navigate to payment history & toast
                        navigate('/dashboard/payment-history')
                        toast.success("Your payment has been successfully paid.")
                    }   
                }
            }
        }


    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-sm btn-primary' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className='text-red-500'>{error}</p>
            {
                transactionId && <p className='text-green-500'>Payment transaction Id:{transactionId}</p>
            }
        </form>
    );
};

export default CheckOutForm;