import React, { useState } from 'react';
import useFetchUserDetails from '../../utils/useFetchUserDetails';
import Loader from "../Loader";
import { useSelector } from 'react-redux';
import GeneralButton from '../Forms/GeneralButton';
import ProfileRoommateTabEdit from './UserEdit';
import User from '../User';

const UserTab = () => {
  const {user} = useSelector((state) => state.auth);
  const [editting, setEditting] = useState(false);
  let { userDetails, refetch, isFetching } = useFetchUserDetails();  
  
  if (isFetching) {
    return <Loader/>
  }

  return (
  <div style={{display:"flex", flexDirection:"column", alignContent:"start", width:"100%", margin:"0px auto"}}>
    {!editting && !isFetching?
      <User user={user} userDetails={userDetails}/>
      : <ProfileRoommateTabEdit userDetails={userDetails} setEditting={setEditting} refetch={refetch}/>}
    <div style={{justifySelf:"center", alignSelf:"center"}}>
      <GeneralButton type={"button"} onClick={()=> setEditting(prev => !prev)} name={`${editting? "Cancel": "Edit Profile"}`}/>
    </div>
  
  </div>
)}   
        
export default UserTab
        