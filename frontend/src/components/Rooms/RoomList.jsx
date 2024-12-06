import { Link } from "react-router-dom";
import Room from "./Room";
import Pagination from 'react-bootstrap/Pagination';
import { useEffect, useState } from "react";
import Loader from "../Misc/Loader";
import { motion } from "motion/react"
import ErrorBox from "../Misc/ErrorBox";
import styles from "./roomlist.module.css";

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
    <div className={styles.container}>
        
        { data.count===0 && <ErrorBox error={"No Rooms Found!"}/>}   
        
        {data? data.rooms && data.rooms.map(child => {
            return ( 
                <motion.div
                whileHover={{scale:0.97}}
                className={styles.roomListContainer}
                key={child.id + "motion"}
                >
                <Room key={"dawldjawkdalk" + child.id} User={child.User} roomDetails={child} roomImage={child["Room_Image"]}/>
                </motion.div>
            )}): <Loader/>}
        <Pagination style={{margin:"auto"}}>{items}</Pagination>
    </div>);
}


    