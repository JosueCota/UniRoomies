import { useGetRoommatesQuery } from "../../features/roommatesApiSlice";
import { Link, useParams } from "react-router-dom";
import Roommate from "./Roommate";
import Pagination from 'react-bootstrap/Pagination';
import { useEffect, useState } from "react";
import Loader from "../Loader";

export default function RoommateList() {
    
    const [items, setItems] = useState([]);
    
    const { page } = useParams();
    
    const {data, refetch} = useGetRoommatesQuery({offset: parseInt(page)});

    
    useEffect(()=> {
        if (data) {
            let pagination = [];
            for (let number = 1; number <= 10% data.count; number++) {
                pagination.push(<Pagination.Item key={number} active={number === page}><Link to={`/roommates/${number}`}>{number}</Link></Pagination.Item>);
            }
            setItems(pagination);
        }
    },[])

    return (
    <div>
        {data? data.users && data.users.map(child => {
            return (
                <Roommate id={child.id} firstName={child.firstName} lastName={child.lastName} userDetails={child.User_Detail} cities={child.User_Detail.cities} pfp={child.pfp}/>
            )}): <Loader/>}
        <Pagination style={{margin:"auto"}}>{items}</Pagination>
    </div>);
}

{/* <motion.div
    whileHover={{scale:1.03}}
    style={{width:"95%", margin:"auto"}}
    ></motion.div> */}
    // </motion.div>