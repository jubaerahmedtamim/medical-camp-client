import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AllParticipants = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["participants"],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This participant will be an organizer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Do it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/admin/${id}`);
                if (res.data.modifiedCount > 0) {
                    toast.success("User has been successfully made an Organizer.")
                }
            }
        });

    }
    return (
        <div>
            <h1>Total Participants: {users.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Gmail</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => <tr key={user._id}>
                            <th>{idx + 1}</th>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>
                                {
                                    user?.role === 'admin' ? 'Organizer' : <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-sm'>
                                    Make Organizer
                                </button>
                                }
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllParticipants;