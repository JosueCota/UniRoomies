import React from 'react'
import styles from "./submitbtn.module.css"
const SubmitBtn = ({name, action}) => {
  return (
    <button onClick={action} className={styles.button} type='submit'>
        {name}
    </button>
  )
}

export default SubmitBtn
