import RoomImage from "./RoomImage";


export default function Room({id, roomDetails, firstName, lastName}) {
    return (
    <>
        <Link to={`/roommates/roommate/${id}`} className={styles.link}>
        <div className={styles.roommateCardContainer}>
            <RoomImage url={roomDetails.image}/>
            <p className={styles.name}>{firstName} {lastName}</p>
            <p>Price: ${roomDetails.price}</p>
            <p>Area: {roomDetails.location}</p>
        </div>
    </Link>
    </>);
}