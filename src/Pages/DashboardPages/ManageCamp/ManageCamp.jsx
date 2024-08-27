
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import SectionTitle from '../../../components/SectionTitle';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { Link } from 'react-router-dom';


const ManageCamp = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    // modal


    const { data: manageCamps = [], isLoading, refetch } = useQuery({
        queryKey: ["manageCamps"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/manage-camps?addedBy=${user?.email}`);
            // console.log(res.data);
            return res.data;
        }
    })

    const handleDeleteCamp = (id) => {
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
                const res = await axiosSecure.delete(`/manage-camps/${id}`)
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your camp has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }

            }
        });
    }

    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div>
            <Helmet>
                <title>campDoc | Manage camps</title>
            </Helmet>
            <SectionTitle heading={"Manage Camps"} subHeading={"Here you can edit & delete your camps."}></SectionTitle>
            <div className='mt-10'>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Camp Name</th>
                                <th>Location</th>
                                <th>Camp Fees</th>
                                <th>Healthcare Professional Name</th>
                                <th>Scheduled Date</th>
                                <th>Time</th>
                                <th>Edit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                manageCamps.map((camp, index) => <tr key={camp._id}>
                                    <th>{index + 1}</th>
                                    <td>{camp.campName}</td>
                                    <td>{camp.location}</td>
                                    <td>{camp.campFees}</td>
                                    <td>{camp.professionalName}</td>
                                    <td>{camp.date}</td>
                                    <td>{camp.time}</td>
                                    <td>
                                        <Link to={`update-manage-camp/${camp._id}`}>
                                            <button className='btn btn-square btn-outline'>
                                                <FaEdit className='text-lg'></FaEdit>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteCamp(camp._id)} className='btn btn-square btn-outline'>
                                            <FaTrash className='text-red-600 text-lg'></FaTrash>
                                        </button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageCamp;