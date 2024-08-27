import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAvailableCamp = () => {
    const axiosSecure = useAxiosSecure();

    const {data: availableCamps=[], isLoading, refetch} = useQuery({
        queryKey: ['availableCamps'],
        queryFn: async()=> {
            const res = await axiosSecure.get('/available-camps');
            return res.data;
        }
        
    })
    return [availableCamps, isLoading, refetch]
};

export default useAvailableCamp;