import React from 'react'
import styles from "./roomoptionals.module.css"
import MultiSelect from '../Forms/MultiSelect'
import SingleSelect from '../Forms/SingleSelect'
import { Form, FloatingLabel, InputGroup } from 'react-bootstrap'
import InputList from '../Forms/InputList'
import FloatingInput from '../Forms/FloatingInput'

const RoomOptionals = ({optionalMulti, setOptionalMulti, placesNear, setPlacesNear, amenities, setAmenities, utilities, setUtilities, roomDetails}) => {

  const options = [
    {value: "description", label: "Description"},
    {value: "amenities", label: "Amenities"},
    {value: "pets", label: "Pets Present"},
    {value: "utility_included", label: "Utilities Included"},
    {value: "size", label: "Room Size"},
    {value: "furnished", label: "Furnished/Unfurnished"},
    {value: "places_near", label: "Places Near"},
    {value: "parking_space", label: "Parking Space Offered"},
  ]
  
  return (
    <div>
      <h2 className={styles.title} style={{marginTop:"3rem"}}>Optional Details</h2>
              
              <div style={{marginBottom:"20px"}}>
              <MultiSelect options={options} value={optionalMulti} onChange={setOptionalMulti} placeholder={"Select Optional Details"}/>
            </div>
            
            { optionalMulti.some(item => item.value === options[0].value) &&
              <FloatingLabel controlId="roomDescription" label="Description (500 Characters)" style={{margin:"20px auto", zIndex:"0"}}>
              <Form.Control
              as="textarea"
              placeholder="Any information not included already about the room."
              alt="Any"
              name='description'
              defaultValue={roomDetails? roomDetails.description: ""}
              style={{ marginBottom: "1rem", height:"200px", whiteSpace:" pre-wrap"}}
              maxLength={500}
              required
              />
              </FloatingLabel>
            }
            
            <div className={styles.booleanInputs}>
              {
                optionalMulti.some(item => item.value === options[2].value) &&
                <SingleSelect label="Are there Pets?" name="pets" controlId={"pets"} options={["Yes", "No"]} def={roomDetails && roomDetails.pets} optionLabel={"Option"}/>
              }
              {
                optionalMulti.some(item => item.value === options[5].value) &&
                <SingleSelect label="Is the room Furnished?" name="furnished" controlId={"furnished"} options={["Yes", "No"]} def={roomDetails && roomDetails.furnished} optionLabel={"Option"}/>
              }
              {
                optionalMulti.some(item => item.value === options[7].value) &&
                <SingleSelect label="Parking Space Offered?" name="parking_space" controlId={"parkingSpace"} options={["Yes", "No"]} def={roomDetails && roomDetails.parkingSpace} optionLabel={"Option"}/>
              }
            </div>
              <div className={styles.inputGroup}>
              {
                optionalMulti.some(item => item.value === options[4].value) &&
                <InputGroup>
                  <FloatingInput controlId="size" label="Room Size (Sq.Ft.)" name={"size"} type={"number"} defaultVal={roomDetails && roomDetails.size? roomDetails.size: null} required={true} min={70}/>
                  <InputGroup.Text>Sq. Ft.</InputGroup.Text>
                </InputGroup>
              }

              {
                optionalMulti.some(item => item.value === options[3].value) &&
                <MultiSelect state={utilities} onChange={setUtilities} name={"utilities_included"} placeholder={"Utilities Included in Price"} options={[
                  {value: "Electricity", label: "Electricity"},
                  {value: "Gas", label: "Gas"},
                  {value: "Internet", label: "Internet"},
                  {value: "Water", label: "Water"},
                  {value: "Sanitation", label: "Sanitation"},
                ]} required={true} />
              }
              </div>
             
             {
               optionalMulti.some(item => item.value === options[6].value) &&
               <InputList label={"Places Nearby (15 Max)"} state={placesNear} onChange={setPlacesNear}  limit={15} />
              }
              {
                optionalMulti.some(item => item.value === options[1].value) &&
                <InputList label={"Amenities (15 Max)"} state={amenities} onChange={setAmenities}  limit={15} />
              }
    </div>
  )
}

export default RoomOptionals
