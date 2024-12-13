import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetRoommateQuery } from '../../features/roommatesApiSlice';
import User from '../User';
import Loader from '../Misc/Loader';
import BrandHeader from '../NavsHeaders/BrandHeader';
import GeneralButton from '../Forms/GeneralButton';
import { useCreateChatMutation } from '../../features/chatApiSlice';
import { useFetchRoommate } from '../../utils/useFetchRoommates';
import ErrorBox from '../Misc/ErrorBox';

//Specific roommate page
const RoommatePage = () => {

  const navigate = useNavigate();
  const { id } = useParams()
  const {roommate, error} = useFetchRoommate(id);
  const [createChat] = useCreateChatMutation();
  
  const handleClick = async () => {

    await createChat({to_id: id})
    navigate(`/chats`)    
  }

  return (
    <div style={{width:"100%"}}>
      <BrandHeader/>
      <div style={{display:"flex", flexFlow:"column"}}>
        <GeneralButton name={"Go Back"} type={'button'} onClick={() => navigate(-1)}/>
      {roommate? roommate.user && <>
        <User userDetails={roommate.details} user={roommate.user}>
          <GeneralButton name="Send Message" type={"button"} onClick={handleClick}/>
        </User>
      </>
        : <Loader/>
      }
      {error && <ErrorBox error={error}/>}
      </div>
    </div>
  )
}

export default RoommatePage
