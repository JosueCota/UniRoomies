import React from 'react'
import styles from "./profilepic.module.css"

//UI component for displaying pfp
const ProfilePic = ({num, style}) => {

  return (
    <div className={`${styles.imageContainer} ${style}`}>
      <img src={`/pfp${num}.jpg`} alt="Profile-Picture" className={`${styles.img}`}/>                           
    </div>
    )
}

export default ProfilePic;
