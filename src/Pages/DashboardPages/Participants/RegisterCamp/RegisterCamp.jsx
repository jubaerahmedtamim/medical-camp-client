import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

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

    const handleRemoveCamp = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/delete-registered-camp/${id}`)
                if (res.data.deletedCount > 0) {
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

    const handleFeedback = async(e) => {
        e.preventDefault();
        const feedback = e.target.feedback.value;

        const userFeedback = {
            name: user?.displayName,
            image: user?.photoURL,
            feedback,
            date: new Date(),
        }
        const res = await axiosSecure.post('/feedback', userFeedback);
        if(res.data.insertedId){
            document.getElementById('my_modal_4').close()
            toast.success(`${user?.displayName}, thanks for your feedback.`)
        }
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
                                        camp.confirmation_status === 'Pending' ? "Pending" : "Confirmed"
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleRemoveCamp(camp._id)} disabled={camp.payment_status === 'paid' || camp.confirmation_status === 'Confirmed'} className='btn btn-xs btn-error'>Cancel</button>
                                </td>
                                <td>
                                    <button onClick={() => document.getElementById('my_modal_4').showModal()} disabled={camp.confirmation_status === 'Pending' || camp.payment_status === 'unpaid'} className='btn btn-sm btn-success'> Give feedback</button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
            {/* modal */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Hello! {user?.displayName}</h3>
                    <p className="py-4">Please give your valuable feedback to us.</p>
                    <div className="">
                        <form onSubmit={handleFeedback} method="dialog" className='flex flex-col space-y-2'>
                            {/* if there is a button, it will close the modal */}
                            <textarea
                                name='feedback'
                                placeholder="Bio"
                                className="textarea textarea-bordered textarea-md w-full max-w-xs"></textarea>
                            <button  className="btn">Submit</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default RegisterCamp;