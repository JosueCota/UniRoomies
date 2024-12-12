import { useGetRoommatesQuery, useGetRoommateQuery } from "../features/roommatesApiSlice";
import { useState, useEffect } from "react";

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

export const useFetchRoommate = (id) => {
       
    const [roommate, setRoommate] = useState({});
    const { data, error } = useGetRoommateQuery({id});

    useEffect(() => {
        if (data && data.user) {
            setRoommate(prev => processRoommate(data.user));  // Process the details
        }          
    }, [data]);
        
    return {roommate, error};
}

const processRoommate = (userP) => {

    return {
            user: {
                firstName: userP.firstName,
                lastName: userP.lastName,
                id: userP.id,
                pfp: userP.pfp,
            },
            details : {
                cities: userP.User_Detail.cities,
                age: userP.User_Detail.age,
                budget: userP.User_Detail.budget,
                gender: userP.User_Detail.gender,
                roomSharing: userP.User_Detail.room_sharing,
                moveInDate: userP.User_Detail.move_in_date,
                description: userP.User_Detail.roommate_desc || null,
                isSmoker: userP.User_Detail.is_smoker !== null? userP.User_Detail.is_smoker: null,
                stayLength: userP.User_Detail.stay_length || null,
                hobbies: userP.User_Detail.hobbies || null,
                accomodations: userP.User_Detail.accomodations || null,
                parkingNeeded: userP.User_Detail.parking_needed!== null? userP.User_Detail.parking_needed:null,
                sleepSchedule: userP.User_Detail.sleep_schedule || null,
                petOwner: userP.User_Detail.pet_owner!== null? userP.User_Detail.pet_owner: null,
                contacts: userP.User_Detail.contacts || null,
                couplesOk: userP.User_Detail.couples_ok !== null? userP.User_Detail.couples_ok:null,
                university: userP.User_Detail.university || null,
                livingPreferences: userP.User_Detail.living_preferences || null
            }
        }
}