import React from 'react'
import styles from "./user.module.css"
import ProfilePic from './ProfilePic'
import ErrorBox from './Misc/ErrorBox'

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
                <div>Cities Of Interest: {userDetails.cities && userDetails.cities.map(city => <p className={styles.city}>{city}</p>)}</div>
              </>
                : <ErrorBox error={"Please Edit Your Profile"}/>
              }
            </div>
          </header>
        <div className={styles.listContainer}>
          
          {userDetails.description && <p style={{whiteSpace:"pre-line"}}>Description: {userDetails.description}</p>}
          {userDetails.hobbies && <li>Hobbies: {userDetails.hobbies ? userDetails.hobbies.map(hobby => <p>{hobby}</p>): null}</li>}
          {userDetails.contacts && <li>Contacts: {userDetails.contacts ? userDetails.contacts.map(link => <p>{link}</p>):null}</li>}
          {userDetails.parkingNeeded!=null && <li>Parking Needed: {userDetails.parkingNeeded? "Yes": "No"}</li>}
          {userDetails.sleepSchedule && <li>Sleep Schedule: {userDetails.sleepSchedule}</li>}
          {userDetails.petOwner!=null && <li>Pet Owner: {userDetails.petOwner? "Yes": "No"}</li>}
          {userDetails.stayLength && <li>Stay Length: {userDetails.stayLength} Months</li>}
          {userDetails.accomodations && <li>Accomodations: {userDetails.accomodations.map(accomodation=> <p>{accomodation}</p>)}</li>}
          {userDetails.livingPreferences && <li>Living Preferences: {userDetails.livingPreferences.map(pref=> <p>{pref}</p>)}</li>}
          {userDetails.isSmoker!=null && <li>Smoker: {userDetails.isSmoker? "Yes": "No"}</li>}
          {userDetails.university && <li>Attending {userDetails.university}</li>}
          {userDetails.couplesOk!=null && <li>Okay with Couples: {userDetails.couplesOk? "Yes": "No"}</li>}
        </div>
        </>
          : <p>You Must First Update Info</p>}
        {children}
      </div>
  )
}

export default User
