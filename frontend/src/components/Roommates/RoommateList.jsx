import { useGetRoommatesQuery } from "../../features/roommatesApiSlice";
import { Link, useParams } from "react-router-dom";
import Roommate from "./Roommate";
import Pagination from 'react-bootstrap/Pagination';
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { motion } from "motion/react"

export default function RoommateList({data, page}) {
    
    const [items, setItems] = useState([]);

    
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
    <div style={{width:"100%", display:"flex", alignContent:"center", flexFlow:"column wrap", marginBottom:"2rem"}}>
                
        {data? data.users && data.users.map(child => {
            return ( 
                <motion.div
                whileHover={{scale:1.03}}
                style={{ width:"85%", margin:"auto"}}
                >
                <Roommate id={child.id} firstName={child.firstName} lastName={child.lastName} userDetails={child.User_Detail} cities={child.User_Detail.cities} pfp={child.pfp}/>
                </motion.div>
            )}): <Loader/>}
        <Pagination style={{margin:"auto"}}>{items}</Pagination>
    </div>);
}


    