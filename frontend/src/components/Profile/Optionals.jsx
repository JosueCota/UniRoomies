import React from 'react'
import styles from "./optionals.module.css"
import MultiSelect from '../Forms/MultiSelect'
import SingleSelect from '../Forms/SingleSelect'
import { Form, FloatingLabel, InputGroup } from 'react-bootstrap'
import InputList from '../Forms/InputList'

const Optionals = ({optionalMulti, setOptionalMulti, accomodations, setAccomodations, contacts, setContacts, hobbies, setHobbies, userDetails, handleNextPrevClick}) => {

  const options = [
    {value: "description", label: "Description"},
    {value: "stay_length", label: "Stay Length"},
    {value: "sleep_schedule", label: "Sleep Schedule"},
    {value: "is_smoker", label: "Smoker"},
    {value: "couplesOk", label: "Ok With Couples"},
    {value: "pet_owner", label: "Pet Owner"},
    {value: "parking_needed", label: "Parking"},
    {value: "accomodations", label: "Accomodations"},
    {value: "hobbies", label: "Hobbies"},
    {value: "contacts", label: "Contacts"},
  ]
  
  return (
    <div>
      <h2 className={styles.title} style={{marginTop:"3rem"}}>Optional Details</h2>
              
              <div style={{marginBottom:"20px", width:"90%", margin:"0px auto auto auto"}}>
              <MultiSelect options={options} value={optionalMulti} onChange={setOptionalMulti} placeholder={"Select Optional Details"}/>
            </div>
            
            { optionalMulti.some(item => item.value === options[0].value) &&
              <FloatingLabel controlId="floatingTextarea2" label="Description (500 Characters)" style={{width:"90%" , margin:"20px auto", zIndex:"0"}}>
              <Form.Control
              as="textarea"
              placeholder="Introduce yourself and include any other information you'd like to include. (Note: Don't Include sensitive information.)"
              name='roommate_desc'
              defaultValue={userDetails.description || ""}
              style={{ marginBottom: "20px", height:"200px", whiteSpace:" pre-wrap"}}
              maxLength={500}
              required
              />
              </FloatingLabel>
            }
            
            <div className={styles.booleanInputs}>
              {
                optionalMulti.some(item => item.value === options[3].value) &&
                <SingleSelect label="Do You Smoke?" name="is_smoker" defaultValue={userDetails.isSmoker} controlId={"isSmoker"} options={["Yes", "No"]} def={userDetails.isSmoker? "Yes": "No"} optionLabel={"Option"}/>
              }
              {
                optionalMulti.some(item => item.value === options[4].value) &&
                <SingleSelect label="Okay with Couples?" name="couples_ok" defaultValue={userDetails.couplesOk || false} controlId={"couplesOk"} options={["Yes", "No"]} def={userDetails.couplesOk? "Yes": "No"} optionLabel={"Option"}/>
              }
              {
                optionalMulti.some(item => item.value === options[5].value) &&
                <SingleSelect label="Pet Owner?" name="pet_owner" defaultValue={userDetails.petOwner || false} controlId={"petOwner"} options={["Yes", "No"]} def={userDetails.petOwner? "Yes": "No"} optionLabel={"Option"}/>
              }
              {
                optionalMulti.some(item => item.value === options[6].value) &&
                <SingleSelect optionLabel={"Parking"} label="Parking Needed?" name="parking_needed" defaultChecked={userDetails.parkingNeeded || false} controlId={"parkingNeeded"}  options={["Yes", "No"]} def={userDetails.parkingNeeded? "Yes": "No"}/>
              }
            </div>
              <div className={styles.inputGroup2}>
              {
                optionalMulti.some(item => item.value === options[1].value) &&
                <div style={{display:"flex", width:"max-content", flexFlow:"column"}}>
                    <Form.Label htmlFor=''><strong>Stay Length</strong></Form.Label>
                    <InputGroup>
                  <Form.Control id='stay_length' label="Time" type='number' name='stay_length' min={1} required placeholder='Stay Length' defaultValue={userDetails.stayLength? userDetails.stayLength: null}/>
                  <InputGroup.Text>Months</InputGroup.Text>
                    </InputGroup>
                </div>
              }
              {
                optionalMulti.some(item => item.value === options[2].value) &&
                <div style={{width:"10rem"}}>
                  <SingleSelect controlId={"sleepSchedule"} name={"sleep_schedule"} options={["Early", "Late", "Varies"]} label={"Sleep Schedule"} def={userDetails.sleepSchedule? userDetails.sleepSchedule: null} optionLabel={"Hours"}/>
                </div> 
              }

              
              {
                optionalMulti.some(item => item.value === options[7].value) &&
                <MultiSelect state={accomodations} onChange={setAccomodations} name={"accomodations"} placeholder={"Accomodations"} options={[
                  {value: "Pet Allergies", label: "Pet Allergies"},
                  {value: "Food Allergies", label: "Food Allergies"},
                  {value: "Wheelchair Accessibility", label: "Wheelchair Accessibility"},
                  {value: "Noise Sensitivity", label: "Noise Sensitivity"},
                  {value: "Light Sensitivity", label: "Light Sensitivity"},
                  {value: "Temperature Sensitivity", label: "Temperature Sensitivity"},
                  {value: "Guide Dog", label: "Guide Dog"},
                ]} required={true} />
              }
              </div>
             
             {
               optionalMulti.some(item => item.value === options[8].value) &&
               <InputList label={"Hobbies"} state={hobbies} onChange={setHobbies}  limit={15} />
              }
              {
                optionalMulti.some(item => item.value === options[9].value) &&
                <InputList label={"Contacts"} state={contacts} onChange={setContacts}  limit={5} />
              }
    </div>
  )
}

export default Optionals
