import React from 'react'
import styles from "./brandheader.module.css"
import { BsFillHousesFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const BrandHeader = () => {
  return (
      <div className={styles.brandCont}>
        <Link to="/" className={styles.link}>
          <BsFillHousesFill className={styles.brandIcon} size={36}/>
          <p className={styles.brandTitle}>UniRoomies</p>
        </Link>
      </div>
  )
}

export default BrandHeader
