import { Link } from "react-router-dom";
import RoomImage from "./RoomImage";
import styles from "./room.module.css"

export default function Roommate({User, roomDetails, roomImage}) {
    
    console.log(roomDetails)
    return (
    <Link to={`/rooms/room/${User.id}`} className={styles.link}>
        <div className={styles.roommateCardContainer}>
            <RoomImage  url={roomImage.image1}/>
            <p className={styles.name}>{User.firstName} {User.lastName}</p>
            <p>Price: ${roomDetails.price}</p>
            <p>Location: {roomDetails.location}</p>
            <p>{roomDetails.sharing}</p>
            <p>Date For Move In: {roomDetails.date_available}</p>
        </div>
    </Link>
    );
}