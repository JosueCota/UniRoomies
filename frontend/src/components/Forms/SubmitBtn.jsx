import React from 'react'
import styles from "./submitbtn.module.css"
const SubmitBtn = ({name}) => {
  return (
    <button className={styles.button} type='submit'>
        {name}
    </button>
  )
}

export default SubmitBtn
