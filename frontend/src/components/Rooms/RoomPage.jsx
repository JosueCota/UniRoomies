import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../Misc/Loader';
import BrandHeader from '../NavsHeaders/BrandHeader';
import GeneralButton from '../Forms/GeneralButton';
import { useFetchRoom } from '../../utils/useFetchRooms';
import UserRoom from './UserRoom';
import { useSelector } from 'react-redux';
import ErrorBox from '../Misc/ErrorBox';

//Specific room page logic handler
const RoomPage = () => {

  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams()

  const {roomData, isFetching, refetch} = useFetchRoom({id});

  return (
    <div style={{width:"100%"}}>
      <BrandHeader/>
      {roomData.user? 
      <div style={{display:"flex", flexFlow:"column"}}>
        <GeneralButton name={"Go Back"} type={'button'} onClick={() => navigate(-1)}/>
      {roomData? roomData.user && <>
        <UserRoom user={roomData.user} room={roomData.room} images={roomData.images}>
          {user.id == id && <Link to="/rooms/edit-room"><GeneralButton name={"Edit Room"} type={"button"}/></Link>}
        </UserRoom>
      </>
        : <Loader/>
      }
      </div>
      : <ErrorBox error={"User Doesn't Exist"}/>}
    </div>
  )
}

export default RoomPage
