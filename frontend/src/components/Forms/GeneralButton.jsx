import React from 'react'
import styles from "./generalbutton.module.css"

//Button used for navigation and other related actions (grey and white)
const GeneralButton = ({name, type, onClick}) => {
  return (
    <button className={styles.button} type={type} onClick={type!=="submit" && onClick}>
        {name}
    </button>
  )
}

export default GeneralButton
