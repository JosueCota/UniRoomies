import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../Loader';
import BrandHeader from '../NavsHeaders/BrandHeader';
import GeneralButton from '../Forms/GeneralButton';
import { useFetchRoom } from '../../utils/useFetchRooms';
import UserRoom from './UserRoom';

const RoomPage = () => {

  const navigate = useNavigate();
  const { id } = useParams()

  const {roomData, isFetching, refetch} = useFetchRoom({id});

  return (
    <div style={{width:"100%"}}>
      <BrandHeader/>
      <div style={{display:"flex", flexFlow:"column"}}>
        <GeneralButton name={"Go Back"} type={'button'} onClick={() => navigate(-1)}/>
      {roomData? roomData.user && <>
        <UserRoom user={roomData.user} room={roomData.room} images={roomData.images}/>
      </>
        : <Loader/>
      }
      </div>
    </div>
  )
}

export default RoomPage
