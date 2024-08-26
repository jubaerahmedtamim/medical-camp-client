import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { useForm } from 'react-hook-form';
import uploader from '../../../Utils/uploader';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddCamp = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm()

      const onSubmit = async(data) => {
        const {campName, campFees, location, date, time, professionalName, details, image } = data;
        const imageFile = { image: image[0] }
        const imageRes = await uploader({imageFile});
        
        console.log(imageRes.data.display_url);

        const campInfo = {
            campName,
            campFees,
            location,
            professionalName, 
            date, 
            time,
            details,
            addedBy: user?.email,
            image_url: imageRes.data.display_url,
            participantCount: 0,
        }
        // console.log(campInfo);
        const res = await axiosSecure.post('/camp',campInfo);
        if(res.data?.insertedId){
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "A new camp has been successfully added.",
                showConfirmButton: false,
                timer: 1500
              });
        }
      }
    return (
        <div>
            <SectionTitle heading={'Add a Camp'} subHeading={'More medical camp will help the people.'}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex gap-8'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Camp name?</span>
                            </div>
                            <input {...register("campName", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full" />
                            {errors.campName && <span className='text-sm text-red-600'>This field is required</span>}
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Camp fees</span>
                            </div>
                            <input {...register("campFees", { required: true })} type="number" placeholder="Type here! Number only." className="input input-bordered w-full" />
                            {errors.campFees && <span className='text-sm text-red-600'>This field is required</span>}
                        </label>
                    </div>
                    <div className='flex gap-8'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Location?</span>
                            </div>
                            <input {...register("location", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full" />
                            {errors.location && <span className='text-sm text-red-600'>This field is required</span>}
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Healthcare professional name?</span>
                            </div>
                            <input {...register("professionalName", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full" />
                            {errors.professionalName && <span className='text-sm text-red-600'>This field is required</span>}
                        </label>
                    </div>
                    <div className='flex gap-8'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Date</span>
                            </div>
                            <input {...register("date", { required: true })} type="date" placeholder="Enter Scheduled Date" className="mt-1 p-2 w-full border border-primary/20 rounded-md focus:border-primary/20 outline-none transition-colors duration-300" />
                            {errors.date && <span className='text-sm text-red-600'>This field is required</span>}
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Time</span>
                            </div>
                            <input {...register("time", { required: true })} type="time" className="mt-1 p-2 w-full border border-primary/20 rounded-md focus:border-primary/20 outline-none transition-colors duration-300" />
                            {errors.time && <span className='text-sm text-red-600'>This field is required</span>}
                        </label>
                    </div>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Camp details</span>
                        </div>
                        <textarea {...register("details", { required: true })} className="textarea textarea-bordered h-24" placeholder="Details"></textarea>
                        {errors.details && <span className='text-sm text-red-600'>This field is required</span>}
                    </label>
                    <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Image</span>
                            </div>
                            <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full" />
                            {errors.image && <span className='text-sm text-red-600'>This field is required</span>}
                        </label>
                    <div className='mt-2'>
                        <input type="submit" value="Add Camp" className="btn" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCamp;