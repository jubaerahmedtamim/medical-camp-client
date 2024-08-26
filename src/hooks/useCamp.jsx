import { useQuery } from "@tanstack/react-query";

const useCamp = () => {
    const {data: camps=[]} = useQuery({
        queryKey: [''],
        queryFn: async()=> {

        }
    })
    return [camps]
};

export default useCamp;