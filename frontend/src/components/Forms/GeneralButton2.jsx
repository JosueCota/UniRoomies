import React from 'react'
import styles from "./generalbutton.module.css"

const GeneralButton2 = ({name, onClick, type}) => {
  return (
    <button className={styles.button2} type={type} onClick={type !=="submit" && onClick}>
        {name}
    </button>
  )
}

export default GeneralButton2
