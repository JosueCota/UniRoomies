import React from 'react'
import styles from "./submitbtn.module.css"
const SubmitBtn = ({name, notSubmit, onClick}) => {
  return (
    <button className={styles.button} type={!notSubmit && 'submit'} onClick={notSubmit && onClick}>
        {name}
    </button>
  )
}

export default SubmitBtn
