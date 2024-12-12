import React from 'react'
import styles from "./user.module.css"
import ProfilePic from './ProfilePic'
import ErrorBox from './Misc/ErrorBox'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const User = ({userDetails, user, children}) => {
  return (
       <div className={styles.container}>
        {user.firstName? <>
          <header className={styles.headerContainer}>
            <ProfilePic num={user.pfp} style={styles.pfp}/>
            <div className={styles.sideHeader}>
              <h1 className={styles.name}>{`${user.firstName} ${user.lastName}`}</h1>
              { userDetails.age? 
              <>
                <div className={styles.baseInf}>
                <span>Age: {userDetails.age}</span>
                <span>Gender: {userDetails.gender}</span>
                <span>Budget: {userDetails.budget}</span>
                <span>Open to Room Sharing: {userDetails.roomSharing? "Yes": "No"}</span>
                <span>Move In Date: {userDetails.moveInDate}</span>
              </div>
                <div className={styles.cities}>Cities Of Interest: {userDetails.cities && userDetails.cities.map(city => <p className={styles.city}>{city}</p>)}</div>
              </>
                : <ErrorBox error={"Please Edit Your Profile"}/>
              }
            </div>
          </header>
        <div className={styles.listContainer}>
          <Tabs
          defaultActiveKey="about-me"
          id="uncontrolled-tab-example"
          className={`mb-3 ${styles.tabs}`}
          >
            <Tab eventKey="about-me" title="About Me">
              {userDetails.description && <p style={{whiteSpace:"pre-line"}}>Description: {userDetails.description}</p>}
              {userDetails.hobbies && <li>Hobbies: {userDetails.hobbies ? userDetails.hobbies.map(hobby => <p className={styles.item}>{hobby}</p>): null}</li>}
              {userDetails.contacts && <li>Contacts: {userDetails.contacts ? userDetails.contacts.map(link => <p className={styles.item}>{link}</p>):null}</li>}
            </Tab>
            <Tab eventKey="living-preferences" title="Living Preferences">
              {userDetails.parkingNeeded!=null && <li>Do I need parking? {userDetails.parkingNeeded? "Yes": "No"}</li>}
              {userDetails.petOwner!=null && <li>Do I own pets? {userDetails.petOwner? "Yes": "No"}</li>}
              {userDetails.isSmoker!=null && <li>Do I smoke? {userDetails.isSmoker? "Yes": "No"}</li>}
              {userDetails.couplesOk!=null && <li>Am I okay living with couples? {userDetails.couplesOk? "Yes": "No"}</li>}
              {userDetails.sleepSchedule && <li>I usually sleep: {userDetails.sleepSchedule}</li>}
              {userDetails.stayLength && <li>Looking to stay: {userDetails.stayLength} Months</li>}
              {userDetails.university && <li>I am attending {userDetails.university}</li>}
              {userDetails.accomodations && <li>Accomodations: {userDetails.accomodations.map(accomodation=> <p className={styles.item}>{accomodation}</p>)}</li>}
              {userDetails.livingPreferences && <li>Lifestyle Preferences: {userDetails.livingPreferences.map(pref=> <p className={styles.item}>{pref}</p>)}</li>}
            </Tab>
          </Tabs>
        </div>
        </>
          : <p>You Must First Update Info</p>}
        {children}
      </div>
  )
}

export default User
