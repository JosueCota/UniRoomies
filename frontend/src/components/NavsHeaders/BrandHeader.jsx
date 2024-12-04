import React from 'react'
import styles from "./brandheader.module.css"
import { BsFillHousesFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import GeneralButton from '../Forms/GeneralButton';
import { useSelector } from 'react-redux';

const BrandHeader = () => {
  const {user} = useSelector(state => state.auth);
  return (
      <div className={styles.brandCont} style={{justifyContent:`${user && "center"}`}}>
        <Link to="/" className={styles.link}>
          <BsFillHousesFill className={styles.brandIcon} size={36}/>
          <p className={styles.brandTitle}>UniRoomies</p>
        </Link>
        {!user && 
          <div className={styles.buttons}>
              <Link to={"/register"}><GeneralButton name={"Create Account"}/></Link>
              <Link to={"/login"}><GeneralButton name={"Login"}/></Link>
          </div>}
      </div>
  )
}

export default BrandHeader
