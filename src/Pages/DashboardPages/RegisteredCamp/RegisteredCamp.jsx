import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const RegisteredCamp = () => {
    const axiosSecure = useAxiosSecure();

    const { data: registeredCamps = [], isLoading, refetch } = useQuery({
        queryKey: ["registeredCamps"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/registered-camps`);
            console.log(res.data);
            return res.data
        }
    })
    const handleConfirm = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to confirm this?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/update-registered-camp-confirmation/${id}`)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your have confirmed.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    }
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                
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
                            <th>Participant Name</th>
                            <th>Camp Name</th>
                            <th>Camp Fees</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th>Cancel Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            registeredCamps.map((camp, idx) => <tr key={camp._id}>
                                <th>{idx + 1}</th>
                                <td>{camp.participantName}</td>
                                <td>{camp.campName}</td>
                                <td>${camp.campFees}</td>
                                <td>
                                    {camp.payment_status === 'paid' ? <p className='text-green-700 font-bold'>{camp.payment_status}</p> : <p className='text-red-700 font-bold'>unpaid</p>}
                                </td>
                                <td>
                                    {camp.confirmation_status === 'Pending' ? <button onClick={() => handleConfirm(camp._id)} className='btn btn-sm'>Pending</button> : <p className=' text-green-700 bold'>Confirmed</p>}
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(camp._id)} disabled={camp.payment_status === 'paid' && camp.confirmation_status === "Confirmed"} className='btn btn-xs btn-error'>Cancel</button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegisteredCamp;