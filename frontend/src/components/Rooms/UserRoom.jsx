import React from 'react'
import styles from "./userroom.module.css"
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

//UI component for a user's room page
const UserRoom = ({room, user, images, children}) => {

    const {user:self} = useSelector((state) => state.auth)
    const carouselImages = images.map(image => (
        <Carousel.Item>
            <img src={image} width={600}/>
        </Carousel.Item>
    ))

  return (
    <div className={styles.container}>
        <div className={styles.headerContainer}>

          <Carousel className={styles.carousel}>
          {carouselImages}
          </Carousel>
          <div className={styles.headerRight}>
            <Link className={styles.name} to={user.id !== self.id?`/roommates/roommate/${user.id}`: "/user"}><spam>{user.firstName} {user.lastName}</spam></Link>
            <p>Room Available: {room.dateAvailable}</p>
            <p>There are {room.currentHousehold} people currently in the house/apartment.</p>
            <p>Monthly Rent: {room.price}</p>
            <p>Room is Located in {room.location}</p>
            <p>Offering a {room.sharing}</p>
          </div>
        </div>
        {room.size && <li>Parking Space: {room.size}</li>}
        {room.parkingSpace && <li>Parking Space: {room.parkingSpace}</li>}
        {room.pets && <li>Pets: {room.pets}</li>}
        {room.furnished && <li>Furnished: {room.furnished}</li>}
        {room.description && <li>Description: {room.description}</li>}
        {room.amenities && <p>Amenities:{room.amenities.map(amenity => <li>{amenity}</li>)}</p>}
        {room.placesNear && <p>Places Near:{room.placesNear.map(place => <li>{place}</li>)}</p>}
        {room.utilitiesIncluded && <p>Places Near:{room.utilitiesIncluded.map(util => <li>{util}</li>)}</p>}
        <div style={{display:"flex", alignItems:"center"}}>
         {children}

        </div>
    </div>
  )
}

export default UserRoom
