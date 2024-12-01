import RoomList from "../components/Rooms/RoomList";
import SearchHeader from "../components/NavsHeaders/SearchHeader";
import { setRoomSearch } from '../features/searchesSlice'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useDebounce from "../utils/useDebounce";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";
import { useFetchRooms } from "../utils/useFetchRooms";

export default function Rooms() {
    
    const { roomSearch } = useSelector((state) => state.search);

    const [address, setAddress] = useState(roomSearch? roomSearch.location? roomSearch.location: "": "")
    const [price, setPrice] = useState(roomSearch? roomSearch.budget? roomSearch.budget: "": "")
    const [loading, setLoading] = useState(false);

    //For adding delay to search fetching
    const debouncedAddress = useDebounce(address, 500, setLoading);
    const debouncedPrice = useDebounce(price, 500, setLoading);

    const { page } = useParams();
    
    const dispatch = useDispatch()

    const  {data, error, refetch} = useFetchRooms({page, location:debouncedAddress, price: debouncedPrice});

    useEffect(()=> {
        dispatch(setRoomSearch({location: debouncedAddress, price: debouncedPrice}))
    }, [debouncedAddress, debouncedPrice])

    const handleRefresh = async() => {
        refetch({page, location:debouncedAddress, price: debouncedPrice});
    }

    return (
    <div style={{display:"flex", flexFlow:"column wrap", width: "100%", backgroundColor:"var(--main-background)"}}>
        <SearchHeader placeholder={"Price"} onClick={handleRefresh} address={address} setAddress={setAddress} budget={price} setBudget={setPrice}/>
        {
            loading && 
            <div style={{position:"relative", top:"4rem", left:"0%"}}>
                <Loader/>
            </div>
        }
        { !error && data &&  
            <RoomList data={data} page={page}/>
        }
        { error && <ErrorBox error={error}/>}
        
    </div>);
}
