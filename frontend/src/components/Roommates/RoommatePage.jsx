import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetRoommateQuery } from '../../features/roommatesApiSlice';
import User from '../User';
import Loader from '../Loader';
import BrandHeader from '../NavsHeaders/BrandHeader';
import GeneralButton from '../Forms/GeneralButton';

const RoommatePage = () => {

  const navigate = useNavigate();
  const { id } = useParams()

  const {data, isLoading} = useGetRoommateQuery({id});
  
  return (
    <div style={{width:"100%"}}>
      <BrandHeader/>
      <div style={{display:"flex", flexFlow:"column"}}>
        <GeneralButton name={"Go Back"} type={'button'} onClick={() => navigate(-1)}/>
      {data? data.user && <>
        <User userDetails={data.user.User_Detail} user={data.user}/>
      </>
        : <Loader/>
      }
      </div>
    </div>
  )
}

export default RoommatePage
