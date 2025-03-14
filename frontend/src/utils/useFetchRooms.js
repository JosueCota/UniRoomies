import { useGetRoomsQuery, useGetRoomQuery } from "../features/roomsApiSlice";
import { useState, useEffect } from "react";

//Return User Details from Get
export const useFetchRooms = ({page, location, price}) => {
       
    const param = {
        offset: parseInt(page),
        location: location,
        price: price
    }

    const { data, refetch, error } = useGetRoomsQuery(param);

    return {data, error, refetch};
}

//returns all rooms public info
export const useFetchRoom = ({id}) => {
    const { data, refetch, isFetching, error } = useGetRoomQuery({id});
    const [roomData, setRoomData] = useState({});
    useEffect(() => {
        if (data && data.room) {
            setRoomData(prev => processRoomData(data.room, data.images));  // Process the details
        }          

    }, [data]);


    return {roomData, isFetching, refetch, error};
}

//Returns it in a nicer format
const processRoomData = (room, images) => {

    return {
        user: {
            id: room.id,
            firstName: room.firstName,
            lastName: room.lastName,
        },
        room: {
            dateAvailable: room.Room.date_available,
            currentHousehold: room.Room.current_household,
            price: room.Room.price,
            location: room.Room.location,
            sharing: room.Room.sharing,
            amenities: room.Room.amenities || null,
            description: room.Room.description || null,
            pets: room.Room.pets!==null? (room.Room.pets === true? "Yes": "No" ) :null,
            furnished: room.Room.furnished!==null? room.Room.furnished ===true ? "Yes": "No" : null,
            utilitiesIncluded: room.Room.utilities_included || null,
            size: room.Room.size || null,
            placesNear: room.Room.places_near || null,
            parkingSpace: room.Room.parking_space!==null? room.Room.parking_space ===true ? "Yes": "No" :null,
        },
        images: images || null
    }

}