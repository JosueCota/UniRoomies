import React from 'react'
import styles from "./homepage.module.css"
import BrandHeader from '../components/NavsHeaders/BrandHeader';

const Homepage = () => {

  return (
    <div className={styles.page}>
      <BrandHeader/>
      <div className={styles.container}>
        <div className={styles.box}>
            <h2 style={styles.title}>Welcome to UniRoomies!</h2>
            <p style={styles.inform}>Here at UniRoomies, we aim to provide users with a pleasant roommate finding experience. Tailored exclusively for university students to help find their perfect roommate. We offer multiple features along with roommate finding to help ease your decision making including room finding, searching by location or budget, chatting, and much more! All you'll need is a student account with an email that has a <strong>".edu" domain</strong> and you can sign up as easy as that!</p>
            <img className={styles.img} src='groupofpeople.jpg'/>
        </div>
      </div>
    </div>
  )
}

export   default Homepage
