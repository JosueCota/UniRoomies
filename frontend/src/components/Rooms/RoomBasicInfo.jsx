import React, { useState } from 'react'
import { InputGroup } from 'react-bootstrap'
import AutoComplete from '../NavsHeaders/AutoComplete'
import SingleSelect from '../Forms/SingleSelect'
import styles from "./roombasicinfo.module.css"
import FloatingInput from '../Forms/FloatingInput'
import { Form } from 'react-bootstrap'

//Room form required data
const RoomBasicInfo = ({roomDetails}) => {
    
  const [city, setCity] = useState(roomDetails? roomDetails.location: null);
  

    return (
    <div>
          <div className={styles.citiesContainer}>
            <InputGroup className={styles.citiesInputGroup} style={{zIndex:2}}>
                <p style={{fontWeight:"600"}}>Location*</p>
                <AutoComplete address={city} onAddressChange={setCity} name={"location"}/>
            </InputGroup>  
          </div>
            <div className={styles.inputGroup}>
              
              <FloatingInput type={"number"} required name={"price"} label={"Price*"} 
              defaultVal={roomDetails? roomDetails.price: null} min={100} max={15000} />

              <FloatingInput type={"number"} required name={"current_household"} label={"Current Number of People in Household*"} 
              defaultVal={roomDetails? roomDetails.currentHousehold: null} min={1} max={10} />

              <SingleSelect controlId={"sharing"} label={"Room Sharing*"} options={["Private Bedroom and Shared Bathroom", "Shared Bedroom and Private Bathroom", "Private Bedroom and Bathroom", "Shared Bedroom and Bathroom"]} name={"sharing"} def={roomDetails? roomDetails.sharing : null} optionLabel={"Sharing"} />
            
              <FloatingInput type="date" required name={"date_available"} label={"Date Available"} defaultVal={roomDetails? roomDetails.dateAvailable : null} />

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Room Images (Limits = 5 Images: Only Image Types Except GIF : 5MB)</Form.Label>
                <Form.Control type="file" multiple name={"images"} required accept=".jpg, .jpeg, .png, .webp, .bmp, .tiff"/>
              </Form.Group>

            </div>
    </div>
  )
}

export default RoomBasicInfo
