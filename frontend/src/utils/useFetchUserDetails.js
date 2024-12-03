import { useGetUserDetailsQuery } from "../features/usersApiSlice";
import { useState, useEffect } from "react";

//Return User Details from Get
const useFetchUserDetails = () => {
    const { data, refetch, isFetching } = useGetUserDetailsQuery();
    const [userDetails, setUserDetails] = useState({});
    
    useEffect(() => {
        if (data && data.userDetails) {
            setUserDetails(prev => processUserDetails(data.userDetails));  // Process the details
        }          
    }, [data]);
        
    return {userDetails, isFetching, refetch};
}

const processUserDetails = (userDetailsDataObj) => {

    return {
        cities: userDetailsDataObj.cities,
        age: userDetailsDataObj.age,
        budget: userDetailsDataObj.budget,
        gender: userDetailsDataObj.gender,
        roomSharing: userDetailsDataObj.room_sharing,
        description: userDetailsDataObj.roommate_desc || null,
        isSmoker: userDetailsDataObj.is_smoker !== null? userDetailsDataObj.is_smoker: null,
        stayLength: userDetailsDataObj.stay_length || null,
        hobbies: userDetailsDataObj.hobbies || null,
        accomodations: userDetailsDataObj.accomodations || null,
        parkingNeeded: userDetailsDataObj.parking_needed!== null? userDetailsDataObj.parking_needed:null,
        sleepSchedule: userDetailsDataObj.sleep_schedule || null,
        petOwner: userDetailsDataObj.pet_owner!== null? userDetailsDataObj.pet_owner: null,
        contacts: userDetailsDataObj.contacts || null,
        moveInDate: userDetailsDataObj.move_in_date || null,
        couplesOk: userDetailsDataObj.couples_ok !== null? userDetailsDataObj.couples_ok:null,
        university: userDetailsDataObj.university || null,
        livingPreferences: userDetailsDataObj.living_preferences || null
    }
}

export default useFetchUserDetails;