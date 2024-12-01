import { useGetRoomsQuery } from "../features/roomsApiSlice";

//Return User Details from Get
export const useFetchRooms = ({page, location, budget}) => {
       
    const param = {
        offset: parseInt(page),
        location: location,
        budget: budget
    }

    const { data, refetch, error } = useGetRoomsQuery(param);

    return {data, error, refetch};
}