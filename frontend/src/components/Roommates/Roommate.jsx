import { Link } from "react-router-dom";
import ProfilePic from "../ProfilePic";
import styles from "./roommate.module.css"

export default function Roommate({id, firstName, lastName, userDetails, cities, pfp, updated}) {
    
    return (
    <Link to={`/roommates/roommate/${id}`} className={styles.link}>
        <div className={styles.roommateCardContainer}>
            <ProfilePic  num={pfp} style={styles.pfp}/>
            <div className={styles.infoContainer}>
                <div className={styles.headerContainer}>
                        <p className={styles.name}>{firstName} {lastName}</p>
                        <span style={{fontStyle:"italic",  }}>Updated {updated.split("T")[0]}</span>
                </div>
                <div className={styles.citiesContainer}>{cities.map((city, index) => {
                    if (index <= 2) {
                        return <strong><span>{city}{index===2 && "..."}</span></strong>
                    }
                })}</div>
                <div className={styles.details}>
                    <span>${userDetails.budget}</span>
                    <span>{userDetails.age} y/o</span>
                    <span>{userDetails.gender}</span>
                    <span>{userDetails.room_sharing? "Sharing": "No Sharing"}</span>
                </div>
            </div>
        </div>
    </Link>
    );
}