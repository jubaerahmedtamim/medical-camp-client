import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterCamp = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: registeredCamps = [], isLoading, refetch } = useQuery({
        queryKey: ["registeredCamps", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/registered-camps/${user?.email}`);
            // console.log(res.data);
            return res.data
        }
    })

    const handleRemoveCamp = (id)=> {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/delete-registered-camp/${id}`)
                if(res.data.deletedCount > 0){
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "This camp has been deleted.",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            }
          });
    }

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
                                    <button onClick={()=>handleRemoveCamp(camp._id)} disabled={camp.payment_status === 'paid' || camp.confirmation_status ==='Confirmed'} className='btn btn-xs btn-error'>Cancel</button>
                                </td>
                                <td>
                                    <button disabled={camp.confirmation_status === 'Pending' || camp.payment_status === 'unpaid' } className='btn btn-sm btn-success'> Give feedback</button>
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