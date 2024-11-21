import { useGetRoommatesQuery } from "../features/roommatesApiSlice";

//Return User Details from Get
export const useFetchRoommates = ({page, location, budget}) => {
       
    const param = {
        offset: parseInt(page),
        location: location,
        budget: budget
    }

    const { data, refetch, error } = useGetRoommatesQuery(param);

    return {data, error, refetch};
}