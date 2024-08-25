
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const login = () => {
    const { signInUser, googleLogin, setLoading } = useAuth();

    const { register, handleSubmit, formState: { errors }, } = useForm()
    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = async(data) => {
        const { email, password, } = data;
        try{
            const res = await signInUser(email, password);
            if(res?.user?.email){
                toast.success("Successfully Logged in.");
                navigate('/');
            }
        }catch(error){
            setLoading(false);
            console.log("Error image", error);
            toast.error(error.code);
        }
        // signInUser(email, password)
        //     .then(result => {
        //         console.log(result.user);
        //         //todo: toast
        //         navigate(location?.state ? location.state : '/');
        //     })
        //     .catch(error => {
        //         console.log(error.message);
        //         if (error) {
        //             //Todo: toast here 
        //         }
        //     })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user);
                // toast.success("Logged in successfully using google.")
                navigate(location?.state ? location.state : '/');
            })
    }
    
    return (
        <div>
            <Helmet>
                <title>CampDoc | login</title>
            </Helmet>

            <div className='my-6 max-w-lg mx-auto'>
            <h3 className='text-4xl font-semibold text-center'>Please Login</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                    {errors.email && <span className='text-red-600 text-sm'>This field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input {...register("password", { required: true })} type="password" placeholder="password" className="input input-bordered" />
                    {errors.password && <span className='text-red-600 text-sm'>This field is required</span>}
                    
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
            <p className='text-center'>Don't have an account? <Link to='/signup' className='text-blue-600 font-bold'>Register</Link></p>
            <div className="divider">OR</div>
            {/* social login part */}
            <div >
                <p className='text-center'>Login using social account.</p>
                <div className='flex gap-4 justify-center mt-4'>
                    <button onClick={handleGoogleLogin} className='btn  btn-outline text-xl flex gap-2 items-center'>
                        <FaGoogle></FaGoogle> Google
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default login;