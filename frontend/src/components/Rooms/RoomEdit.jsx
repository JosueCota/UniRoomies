import React, { useState, useEffect } from 'react'
import BrandHeader from '../NavsHeaders/BrandHeader'
import RoomBasicInfo from './RoomBasicInfo'
import RoomOptionals from './RoomOptionals'
import { useCreateUpdateRoomMutation } from '../../features/roomsApiSlice'
import { useFetchRoom } from '../../utils/useFetchRooms'
import { useSelector } from 'react-redux'
import styles from "./roomedit.module.css"
import Loader from "../Misc/Loader"
import { Form } from 'react-bootstrap'
import GeneralButton2 from '../Forms/GeneralButton2'
import GeneralButton from '../Forms/GeneralButton'
import { extractObjectArrayVal } from '../../utils/dataCleaning'
import { showToastError, showToastWarning, showToastSuccess } from '../../utils/helperFunctions'
import { useNavigate } from 'react-router-dom'

const RoomEdit = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);

  const {roomData, refetch, error} = useFetchRoom({id: user.id});
  const roomDetails = roomData.room;

  const [waiting, setWaiting] = useState(false);
  const [updateRoom] = useCreateUpdateRoomMutation()
  
  const [optionalMulti, setOptionalMulti] = useState([]);
  const [utilities, setUtilities] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [placesNear, setPlacesNear] = useState([]);

  useEffect(() => {
    {
      !error &&
      setUtilities(roomDetails && roomDetails.utilitiesIncluded? roomDetails.utilitiesIncluded.map(val =>
        ({value: val, label: val})): [])
        setAmenities(roomDetails && roomDetails.amenities? roomDetails.amenities: [])
        setPlacesNear(roomDetails && roomDetails.placesNear? roomDetails.placesNear: [])
    }
  }, [roomDetails])
  
  const validate = () => {
    const optVal = extractObjectArrayVal(optionalMulti, "label")
    let valid = true;
    if (optVal.includes("Amenities") && amenities.length === 0 ){
      showToastWarning("Please Enter Some Amenities", "enterAmenitiesErr")
      valid = false;
    }
    if (optVal.includes("Places Near") && placesNear.length === 0 ){
      showToastWarning("Please Enter Some Nearby Places", "enterNearPlacesErr")
      valid = false;
    }
    if (optVal.includes("Utilities Included") && utilities.length === 0 ){
      showToastWarning("Please Include Some Utilities Included", "enterUtilErr")
      valid = false;
    }
    return valid
  }

  const checkLists = (formData) => {
    const optVal = extractObjectArrayVal(optionalMulti, "label")

    if (optVal.includes("Amenities")) {
      for(let i =0; i<amenities.length; i++ ){
        formData.append("amenities[]", amenities[i])
      }
    }  
    if (optVal.includes("Places Near")) {
      for(let i =0; i<placesNear.length; i++ ){
        formData.append("places_near[]", placesNear[i])
      }
    }  
    if (optVal.includes("Utilities Included")) {
      const utils = extractObjectArrayVal(utilities, "value");
      for(let i =0; i<utils.length; i++ ){
        formData.append("utilities_included[]", utils[i])
      }
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData  = new FormData(e.currentTarget);

    if (validate()) {
      try {
        
        checkLists(formData);
        setWaiting(true);

        const res = await updateRoom(formData).unwrap();
        setWaiting(false);

        //Wait for update in database, then refetch data (tags reset when updated)
        refetch();
        showToastSuccess("Updated Room Successfully!" + res.message);
        
      } catch (err) {
        setWaiting(false);
        showToastError(err, "roommateDetailsErr");
      }
    }

  }


  return (
    <div style={{width:"100%"}}>
        <BrandHeader/>
        <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>Update/Create Room</h2>

        <p><strong>Note:</strong> Previously answered <strong>optional questions</strong> will <strong>not</strong> be removed from your information if not included in an update. You only need to include the information that needs updating. Images will, however, be removed, please upload them again!</p>

        <p><strong>Warning:</strong> Don't include any sensitive information like your personal location or any contact information if you would not like it to be public!</p>
        { !waiting?
          <Form onSubmit={handleSubmit} style={{width:"90%", margin:"0 auto"}} encType="multipart/form-data">

            <RoomBasicInfo roomDetails={roomDetails}/>
            <RoomOptionals optionalMulti={optionalMulti} setOptionalMulti={setOptionalMulti} amenities={amenities} setAmenities={setAmenities} placesNear={placesNear} setPlacesNear={setPlacesNear} utilities={utilities} setUtilities={setUtilities} roomDetails={roomDetails}/>
            <div style={{marginTop:"2rem",display:"flex"}}>
            <GeneralButton name={"Cancel"} type={'button'} onClick={() => navigate(-1)}/>
            <GeneralButton2 type={"submit"} name="Update"/>
            </div>
          </Form> : <Loader/>
         }
      </div>
    </div>
    </div>
  )
}

export default RoomEdit
