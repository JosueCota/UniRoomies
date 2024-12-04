import React from 'react'
import styles from "./userroom.module.css"
import Carousel from 'react-bootstrap/Carousel';

const UserRoom = ({room, user, images, children}) => {
    
    const carouselImages = images.map(image => (
        <Carousel.Item>
            <img src={image} width={600}/>
        </Carousel.Item>
    ))

  return (
    <div className={styles.container}>
        <Carousel style={{width: "600px", height:"500px", flexDirection:"column", alignContent:"center"}}>
        {carouselImages}
        </Carousel>
        <p>{user.firstName} {user.lastName}</p>
        <p>{room.dateAvailable}</p>
        <p>{room.currentHousehold}</p>
        <p>{room.price}</p>
        <p>{room.location}</p>
        <p>{room.sharing}</p>
        {room.size && <li>Parking Space: {room.size}</li>}
        {room.parkingSpace && <li>Parking Space: {room.parkingSpace}</li>}
        {room.pets && <li>Pets: {room.pets}</li>}
        {room.furnished && <li>Furnished: {room.furnished}</li>}
        {room.description && <li>Description: {room.description}</li>}
        {room.amenities && <p>Amenities:{room.amenities.map(amenity => <li>{amenity}</li>)}</p>}
        {room.placesNear && <p>Places Near:{room.placesNear.map(place => <li>{place}</li>)}</p>}
        {room.utilitiesIncluded && <p>Places Near:{room.utilitiesIncluded.map(util => <li>{util}</li>)}</p>}
        {children}
    </div>
  )
}

export default UserRoom
