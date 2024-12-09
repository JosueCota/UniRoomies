import { Link } from "react-router-dom";
import ProfilePic from "../ProfilePic";
import styles from "./roommate.module.css"

export default function Roommate({id, firstName, lastName, userDetails, cities, pfp}) {
    
    return (
    <Link to={`/roommates/roommate/${id}`} className={styles.link}>
        <div className={styles.roommateCardContainer}>
                <div className={styles.headerContainer}>
                    <ProfilePic  num={pfp} style={styles.pfp}/>
                        <div className={styles.headerContent}>
                            <p className={styles.name}>{firstName} {lastName}</p>
                            <p className={styles.price}><strong>Budget:</strong> ${userDetails.budget}</p>
                        </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.details}>
                        <span><strong>Age:</strong> {userDetails.age}</span>
                        <span><strong>Gender:</strong> {userDetails.gender}</span>
                        <span><strong>Shared-Room Okay:</strong> {userDetails.room_sharing? "Yes": "No"}</span>
                    </div>
                    <div className={styles.cities}><strong>Cities:</strong>{cities.map((city, index) => {
                        if (index <= 2) {
                            return <span>{city}{index===2 && "..."}</span>
                        }
                    })}</div>
            </div>
        </div>
    </Link>
    );
}