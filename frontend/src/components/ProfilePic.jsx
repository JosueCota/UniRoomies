import React from 'react'
import styles from "./profilepic.module.css"

const ProfilePic = ({num}) => {

  return (
    <div className={styles.imageContainer}>
      <img src={`/pfp${num}.jpg`} alt="Profile-Picture" className={styles.img}/>                           
    </div>
    )
}

export default ProfilePic;
