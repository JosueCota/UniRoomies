import { useGetUserDetailsQuery } from "../features/usersApiSlice";
import { stringToArray } from "./dataCleaning"
import { useState, useEffect } from "react";

//Return User Details from Get
const useFetchUserDetails = () => {
    const { data } = useGetUserDetailsQuery();
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        if (data && data.userDetails) {
            setUserDetails(prev => processUserDetails(data.userDetails));  // Process the details
        }          
    }, [data]);
        
    return {userDetails};
}

const processUserDetails = (userDetailsDataObj) => {
    const arrayCities =  stringToArray(userDetailsDataObj.cities);
    const arrayAccomodations = stringToArray(userDetailsDataObj.accomodations);
    const arrayHobbies = stringToArray(userDetailsDataObj.hobbies);
    
    return {
        cities: arrayCities,
        age: userDetailsDataObj.age,
        budget: userDetailsDataObj.budget,
        gender: userDetailsDataObj.gender,
        roomSharing: userDetailsDataObj.room_sharing,
        description: userDetailsDataObj.roommate_desc || null,
        isSmoker: userDetailsDataObj.is_smoker || null,
        stayLength: userDetailsDataObj.stay_length || null,
        hobbies: arrayHobbies || null,
        accomodations: arrayAccomodations || null,
        parkingNeeded: userDetailsDataObj.parking_needed || null,
        sleepSchedule: userDetailsDataObj.sleep_schedule || null,
        petOwner: userDetailsDataObj.pet_owner || null,
        contacts: userDetailsDataObj.contacts || null,
        moveInDate: userDetailsDataObj.move_in_date || null,
        couplesOk: userDetailsDataObj.couples_ok || null
    }
}

export default useFetchUserDetails;