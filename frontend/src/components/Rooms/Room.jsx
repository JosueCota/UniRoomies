import { Link } from "react-router-dom";
import RoomImage from "./RoomImage";
import styles from "./room.module.css"

//UI component for a room in the list of rooms
export default function Room({User, roomDetails, roomImage}) {
    
    return (
    <Link to={`/rooms/room/${User.id}`} className={styles.link}>
        <div className={styles.roommateCardContainer}>
            <RoomImage  url={roomImage.image1}/>
            <div className={styles.cardInfo}>
                <div className={styles.cardInfoPar}>
                    <p className={styles.name}>{roomDetails.location}</p>
                    <p><strong>Monthly Rent: ${roomDetails.price}</strong></p>
                </div>
                <div className={styles.cardInfoPar}>
                    <p>User: {User.firstName} {User.lastName}</p>
                    <p className={styles.dissappearing}>Offering {roomDetails.sharing}</p>
                    <p>Available On: {roomDetails.date_available}</p>
                </div>
            </div>
        </div>
    </Link>
    );
}