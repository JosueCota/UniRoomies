import React from 'react'
import styles from "./generalbutton.module.css"

//Theme for future, dark or light, changes color
const GeneralButton = ({name, type, onClick}) => {
  return (
    <button className={styles.button} type={type} onClick={type!=="submit" && onClick}>
        {name}
    </button>
  )
}

export default GeneralButton
