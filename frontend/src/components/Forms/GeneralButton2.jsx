import React from 'react'
import styles from "./generalbutton.module.css"

//Button used for form actions (blue and white)
const GeneralButton2 = ({name, onClick, type}) => {
  return (
    <button className={styles.button2} type={type} onClick={type !=="submit" && onClick}>
        {name}
    </button>
  )
}

export default GeneralButton2
