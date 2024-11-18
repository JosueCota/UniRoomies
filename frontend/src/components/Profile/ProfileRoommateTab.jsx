import React, { useState } from 'react';
import useFetchUserDetails from '../../utils/useFetchUserDetails';
import Loader from "../Loader";
import { useSelector } from 'react-redux';
import styles from "./profileroommatetab.module.css";
import SubmitBtn from '../Forms/SubmitBtn';
import ProfileRoommateTabEdit from './ProfileRoommateTabEdit';
import ProfilePic from "../ProfilePic"

const ProfileRoommateTab = () => {
  const {user} = useSelector((state) => state.auth);
  const [editting, setEditting] = useState(false);
  let { userDetails, refetch, isFetching  } = useFetchUserDetails();  
  
  if (isFetching) {
    return <Loader/>
  }

  return (
  <div style={{display:"flex", flexDirection:"column", alignContent:"start", width:"70%", margin:"0px auto"}}>
    {!editting?
      <div className={styles.container}>
        <ProfilePic num={user.pfp}/>
        <h1>{`${user.firstName} ${user.lastName}`}</h1>
        {userDetails.age? 
        <ul className={styles.listContainer}>
          <div>
            <li>Age: {userDetails.age}</li>
            <li>Gender: {userDetails.gender}</li>
            <li>Budget: {userDetails.budget}</li>
            <li>Open to Room Sharing: {userDetails.room_Sharing? "Yes": "No"}</li>
            {userDetails.description && <li>Description: {userDetails.description}</li>}
            <li>Cities Of Interest: {userDetails.cities ? userDetails.cities.map(city => <p>{city}</p>): <Loader/>}</li>
          </div>
          {userDetails.hobbies && <li>Hobbies: {userDetails.hobbies ? userDetails.hobbies.map(hobby => <p>{hobby}</p>): null}</li>}
          {userDetails.contacts && <li>Contacts: {userDetails.contacts ? userDetails.contacts.map(link => <p>{link}</p>):null}</li>}
          {userDetails.parkingNeeded && <li>Parking Needed: {userDetails.parkingNeeded? "Yes": "No"}</li>}
          {userDetails.sleepSchedule && <li>Sleep Schedule: {userDetails.sleepSchedule}</li>}
          {userDetails.petOwner && <li>Pet Owner: {userDetails.petOwner? "Yes": "No"}</li>}
          {userDetails.stayLength && <li>Stay Length: {userDetails.stayLength} Months</li>}
          {userDetails.accomodations && <li>Accomodations: {userDetails.accomodations.map(accomodation=> <p>{accomodation}</p>)}</li>}
          {userDetails.isSmoker && <li>Smoker: {userDetails.isSmoker? "Yes": "No"}</li>}
          {userDetails.moveInDate && <li>Move In Date: {userDetails.moveInDate}</li>}
          {userDetails.couplesOk && <li>Okay with Couples: {userDetails.couplesOk? "Yes": "No"}</li>}
        </ul>
      : <p>You Must First Update Info</p>}
      </div>
      : <ProfileRoommateTabEdit userDetails={userDetails} setEditting={setEditting} refetch={refetch}/>}
    <div style={{justifySelf:"start"}}>
      <SubmitBtn notSubmit={true} onClick={()=> setEditting(prev => !prev)} name={`${editting? "Back": "Edit Profile"}`}/>
    </div>
  
  </div>
)}   
        
export default ProfileRoommateTab
        