import RoommateList from "../components/Roommates/RoommateList";
import SearchHeader from "../components/NavsHeaders/SearchHeader";
import { setRoommateSearch } from '../features/searchesSlice'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFetchRoommates } from "../utils/useFetchRoommates";
import useDebounce from "../utils/useDebounce";
import Loader from "../components/Loader";

export default function Roommates() {
    
    const { roommateSearch } = useSelector((state) => state.search);

    const [address, setAddress] = useState(roommateSearch? roommateSearch.location? roommateSearch.location: "": "")
    const [budget, setBudget] = useState(roommateSearch? roommateSearch.budget? roommateSearch.budget: "": "")
    const [loading, setLoading] = useState(false);

    //For adding delay to search fetching
    const debouncedAddress = useDebounce(address, 500, setLoading);
    const debouncedBudget = useDebounce(budget, 500, setLoading);

    const { page } = useParams();
    
    const dispatch = useDispatch()

    const  {data, error, refetch} = useFetchRoommates({page, location:debouncedAddress, budget: debouncedBudget});

    useEffect(()=> {
        dispatch(setRoommateSearch({location: debouncedAddress, debouncedBudget}))
    }, [debouncedAddress, debouncedBudget])

    const handleRefresh = async() => {
        refetch({page, location:debouncedAddress, budget: debouncedBudget});
    }

    return (
    <div style={{display:"flex", flexFlow:"column wrap", width: "100%", backgroundColor:"var(--main-background)"}}>
        <SearchHeader placeholder={"Budget"} onClick={handleRefresh} address={address} setAddress={setAddress} budget={budget} setBudget={setBudget}/>
        {
            loading && 
            <div style={{position:"relative", top:"4rem", left:"0%"}}>
                <Loader/>
            </div>
        }
        { !error && data &&  
            <RoommateList data={data} page={page}/>
        }
        { error &&
            <div style={{padding:"1rem", backgroundColor: "var(--box-secondary)", width:"40%", borderRadius:"1rem", color:"var(--dark-font)", margin: "auto"}}>
                <p style={{width:"40%",fontSize:"1.5rem", margin:"4rem auto", textAlign:"center"}}>
                    {error?.data?.message || error.error || error}
                </p>
            </div>
        }
        
    </div>);
}
