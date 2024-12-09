import React from 'react'
import styles from "./homepage.module.css"
import BrandHeader from '../components/NavsHeaders/BrandHeader';
import Accordion from 'react-bootstrap/Accordion';

const Homepage = () => {

  return (
    <div className={styles.page}>
      <BrandHeader/>
      <div className={styles.container}>
        <div className={styles.box}>
            <p className={styles.inform}><strong>The most pleasant roommate/room finding experience.</strong> Tailored exclusively for university students to help find their perfect roommate by creating the perfect environment for them!</p>
        </div>
        <div>
          <img className={styles.img} src='groupofpeople.jpg'/>
        </div>
        <div style={{alignSelf:"center"}}>
          <img className={styles.img} src='lotsofpeople.jpg'/>
        </div>
        <div data-bs-theme="dark" className={styles.accordion} >
          <p className={styles.inform}><strong>We offer several features such as:</strong></p>
          <Accordion defaultActiveKey="0" style={{width:"100%"}}>
            <Accordion.Item eventKey="0" >
              <Accordion.Header><p className={styles.accordionHeader}>Roommate/Room Searching</p></Accordion.Header>
              <Accordion.Body style={{fontSize:"1.2rem"}}>
                <p className={styles.accordionBody}>You can search for roommates and rooms using our app with added search functions. There is also plenty of information that can inform you on whether or not that roommmate/room would be perfect for you!</p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header><p className={styles.accordionHeader}>1-to-1 Real Time Chatting</p></Accordion.Header>
              <Accordion.Body style={{fontSize:"1.2rem"}}>
              <p className={styles.accordionBody}>We also offer the ability to chat with other users in real time. No need to use another app to contact other users, and no need to wait or refresh the page to see a chat!</p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header><p className={styles.accordionHeader}>Responsive Design</p></Accordion.Header>
              <Accordion.Body style={{fontSize:"1.2rem"}}>
              <p className={styles.accordionBody}>Though we don't offer a mobile app as of yet, our app is easily navigable through most devices.</p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header><p className={styles.accordionHeader}>Student Exclusivity</p></Accordion.Header>
              <Accordion.Body style={{fontSize:"1.2rem"}}>
                <p className={styles.accordionBody}>To ensure our environment is in fact for students, we require students to register their accounts through email activation and will be requiring them to re-register their emails annually!</p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header><p className={styles.accordionHeader}>Security Above All</p></Accordion.Header>
              <Accordion.Body >
                <p className={styles.accordionBody}>Here at UniRoomies we value security most of all! This is why we make sure to hash our users passwords and encrypt our users sensitive information!</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export   default Homepage
