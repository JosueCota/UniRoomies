import { Link } from "react-router-dom";
import Room from "./Room";
import Pagination from 'react-bootstrap/Pagination';
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { motion } from "motion/react"
import ErrorBox from "../ErrorBox";

const PER_PAGE = 10;

export default function RoomList({data, page}) {
    
    const [items, setItems] = useState([]);

    
    useEffect(()=> {
        if (data) {
            let pagination = [];

            for (let number = 1; number <= Math.ceil(data.count/PER_PAGE); number++) {
                pagination.push(<Pagination.Item key={number} active={number === page}><Link to={`/rooms/${number}`}>{number}</Link></Pagination.Item>);
            }
            setItems(pagination);
        }
    },[])

    return (
    <div style={{width:"100%", display:"flex", alignContent:"center", flexFlow:"column wrap", marginBottom:"2rem"}}>
        
        { data.count===0 && <ErrorBox error={"No Rooms Found!"}/>}   
        
        {data? data.rooms && data.rooms.map(child => {
            return ( 
                <motion.div
                whileHover={{scale:1.03}}
                style={{ width:"85%", margin:"auto"}}
                key={child.id + "motion"}
                >
                <Room key={"dawldjawkdalk" + child.id} User={child.User} roomDetails={child} roomImage={child["Room_Image"]}/>
                </motion.div>
            )}): <Loader/>}
        <Pagination style={{margin:"auto"}}>{items}</Pagination>
    </div>);
}


    