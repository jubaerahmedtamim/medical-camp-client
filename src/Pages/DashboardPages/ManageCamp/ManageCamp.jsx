
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import SectionTitle from '../../../components/SectionTitle';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageCamp = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: manageCamps = [], isLoading, refetch } = useQuery({
        queryKey: ["manageCamps"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/manage-camps?addedBy=${user?.email}`);
            console.log(res.data);
            return res.data;
        }
    })

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
                                        <button className='btn btn-square btn-outline'>
                                            <FaEdit className='text-lg'></FaEdit>
                                        </button>
                                    </td>
                                    <td>
                                        <button className='btn btn-square btn-outline'>
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