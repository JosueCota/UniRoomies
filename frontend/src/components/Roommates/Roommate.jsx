import { Link } from "react-router-dom";
import ProfilePic from "../ProfilePic";
import styles from "./roommate.module.css"

export default function Roommate({id, firstName, lastName, userDetails, cities, pfp}) {
    
    return (
    <Link to={`/roommates/roommate/${id}`} className={styles.link}>
        <div className={styles.roommateCardContainer}>
            <ProfilePic  num={pfp}/>
            <p className={styles.name}>{firstName} {lastName}</p>
            <p>Budget: ${userDetails.budget}</p>
            <p>Age: {userDetails.age}</p>
            <p>Gender: {userDetails.gender}</p>
            <p>Cities: {cities.map(city => <span>{city}</span>)}</p>
            <p>Open to Room Sharing: {userDetails.room_sharing? "Yes": "No"}</p>
        </div>
    </Link>
    );
}