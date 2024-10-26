import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./homepage.module.css"
import BrandHeader from '../components/BrandHeader';

const Homepage = () => {

  return (
    <div className={styles.page}>
      <BrandHeader/>
      <div className={styles.container}>

        <div className={styles.box}>
            <h2>Welcome!</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis eligendi, harum quisquam minima optio delectus maiores repellendus nostrum ex eaque iste, debitis possimus quod quam dolorem reiciendis. Explicabo enim alias quidem commodi esse possimus ullam non eum vitae culpa quasi, rerum eaque? Autem, odio sunt vero doloribus officiis aut expedita dolor quis, perspiciatis atque dignissimos quo. Minus at inventore eius architecto? Ad qui autem adipisci?</p>
        </div>
        <div className={styles.buttons}>
            <Link to={"/register"} className={styles.button}>Create Account</Link>
            <Link to={"/login"} className={styles.button}>Login</Link>
        </div>
      </div>
    </div>
  )
}

export   default Homepage
