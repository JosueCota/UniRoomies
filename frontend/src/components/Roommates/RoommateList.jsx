import { Link } from "react-router-dom";
import Roommate from "./Roommate";
import Pagination from 'react-bootstrap/Pagination';
import { useEffect, useState } from "react";
import Loader from "../Misc/Loader";
import { motion } from "motion/react"
import ErrorBox from "../Misc/ErrorBox";
import styles from "./roommate.module.css"

const PER_PAGE = 10;

export default function RoommateList({data, page}) {
    
    const [items, setItems] = useState([]);

    
    useEffect(()=> {
        if (data) {
            let pagination = [];

            for (let number = 1; number <= Math.ceil(data.count/PER_PAGE); number++) {
                pagination.push(<Pagination.Item key={number} active={number === page}><Link to={`/roommates/${number}`}>{number}</Link></Pagination.Item>);
            }
            setItems(pagination);
        }
    },[])

    return (
    <div style={{width:"100%", display:"flex", alignContent:"center", flexFlow:"column wrap", marginBottom:"2rem"}}>
        
        { data.count===0 && <ErrorBox error={"No Roommates Found!"}/>}   
        
        {data? data.users && data.users.map(child => {
            return ( 
                <motion.div
                whileHover={{scale:0.99}}
                className={styles.superContainer}
                key={child.id + "motion"}
                >
                <Roommate key={"dawldjawkdalk" + child.id} id={child.id} firstName={child.firstName} lastName={child.lastName} userDetails={child.User_Detail} cities={child.User_Detail.cities} pfp={child.pfp} updated={child.User_Detail.updatedAt}/>
                </motion.div>
            )}): <Loader/>}
        <Pagination style={{margin:"auto"}}>{items}</Pagination>
    </div>);
}


    