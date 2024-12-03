import React, { useState } from 'react';
import useFetchUserDetails from '../../utils/useFetchUserDetails';
import Loader from "../Misc/Loader";
import { useSelector } from 'react-redux';
import GeneralButton from '../Forms/GeneralButton';
import UserEdit from './UserEdit';
import User from '../User';

const UserTab = () => {
  const {user} = useSelector((state) => state.auth);
  const [editting, setEditting] = useState(false);
  const { userDetails, refetch, isFetching } = useFetchUserDetails();  
  
  const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional for smooth scrolling
      });
  };

  const handleClick= (val) => {
    scrollToTop();
    setEditting(val)
  }

  if (isFetching) {
    return <Loader/>
  }

  return (
  <div style={{display:"flex", flexDirection:"column", alignContent:"start", width:"100%", margin:"0px auto"}}>
    {!editting && !isFetching?
      <User user={user} userDetails={userDetails}>
        <GeneralButton type={"button"} onClick={()=> handleClick(true)} name={`Edit Profile`}/>
      </User>
      : <UserEdit userDetails={userDetails} setEditting={setEditting} refetch={refetch}> 
          <GeneralButton type={"button"} onClick={()=> handleClick(false)} name={`Cancel`}/>
        </UserEdit>}
  
  </div>
)}   
        
export default UserTab
        