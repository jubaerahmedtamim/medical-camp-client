import React from 'react';
import SectionTitle from '../../../../components/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: payments = [] } = useQuery({
        queryKey: ['payment-history'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <SectionTitle heading={'Payments History'} subHeading={"See your all payments here."}></SectionTitle>
            <div>
                <h1 className='text-2xl'>Total Payments: {payments.length}</h1>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Camp Name</th>
                                    <th>Fees</th>
                                    <th>Payment Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    payments.map((payment, idx) => <tr key={payment._id}>
                                    <th>{idx+1}</th>
                                    <td>{payment.campName}</td>
                                    <td>{payment?.campFees}</td>
                                    <td className='text-green-500'>{payment?.payment_status}</td>
                                </tr>)
                                }
                                
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;