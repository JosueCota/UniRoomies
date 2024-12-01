import React from 'react'
import styles from "./roomimage.module.css"


function RoomImage({url}) {
  return (<img src={url} className={styles.image} alt='room-image'/>)
}

export default RoomImage
