import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const RegisterCamp = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: registeredCamps = [], isLoading, refetch } = useQuery({
        queryKey: ["registeredCamps", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/registered-camps?email=${user?.email}`);
            // console.log(res.data);
            return res.data
        }
    })
    return (
        <div>
            <h1 className='text-2xl'>Total Joined Camps: {registeredCamps.length} </h1>
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Camp Name</th>
                            <th>Camp Fees</th>
                            <th>Participants Name</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th>Cancel Button</th>
                            <th>Feedback Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            registeredCamps.map((camp, idx) => <tr key={camp._id}>
                                <th>{idx + 1}</th>
                                <td>{camp.campName}</td>
                                <td>${camp.campFees}</td>
                                <td>{camp.participantName}</td>
                                <td>
                                    {camp.payment_status === 'unpaid' ? <Link to={`/dashboard/payment/${camp._id}`}><button className='btn btn-sm'>pay</button></Link> : <p className=' text-green-700 disabled'>Paid</p>}
                                </td>
                                <td>
                                    {
                                        camp.confirmation_status === 'Pending' ? "Pending": "Confirmed"
                                    }
                                </td>
                                <td>
                                    <button className='btn btn-xs btn-error'>Cancel</button>
                                </td>
                                <td>
                                    <button disabled className='btn btn-sm btn-success'> Give feedback</button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegisterCamp;