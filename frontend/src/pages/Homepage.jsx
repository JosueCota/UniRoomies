import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./homepage.module.css"
import { BsFillHousesFill } from "react-icons/bs";

const Homepage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.brandCont}>
        <BsFillHousesFill className={styles.brandIcon} size={36}/>
        <p className={styles.brandTitle}>
          UniRoomies
        </p>
      </div>
      <div className={styles.content}>
          <h2>Welcome!</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis eligendi, harum quisquam minima optio delectus maiores repellendus nostrum ex eaque iste, debitis possimus quod quam dolorem reiciendis. Explicabo enim alias quidem commodi esse possimus ullam non eum vitae culpa quasi, rerum eaque? Autem, odio sunt vero doloribus officiis aut expedita dolor quis, perspiciatis atque dignissimos quo. Minus at inventore eius architecto? Ad qui autem adipisci?</p>
          <div>
            <Link to={"/register"} className={styles.button}>Create Account</Link>
            <Link to={"/login"} className={styles.button}>Already Have An Account?</Link>
          </div>
          
      </div>
    </div>
  )
}

export   default Homepage
