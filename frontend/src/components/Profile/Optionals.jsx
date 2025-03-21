import React from 'react'
import styles from "./optionals.module.css"
import MultiSelect from '../Forms/MultiSelect'
import SingleSelect from '../Forms/SingleSelect'
import { Form, FloatingLabel, InputGroup } from 'react-bootstrap'
import InputList from '../Forms/InputList'
import FloatingInput from '../Forms/FloatingInput'

//Optional info for users profile
const Optionals = ({optionalMulti, setOptionalMulti, accomodations, setAccomodations, contacts, setContacts, hobbies, setHobbies, userDetails, livingPreferences, setLivingPreferences}) => {

  const options = [
    {value: "description", label: "Description"},
    {value: "stay_length", label: "Stay Length"},
    {value: "sleep_schedule", label: "Sleep Schedule"},
    {value: "is_smoker", label: "Smoker"},
    {value: "couplesOk", label: "Ok With Couples"},
    {value: "pet_owner", label: "Pet Owner"},
    {value: "parking_needed", label: "Parking"},
    {value: "university", label: "University Attended"},
    {value: "accomodations", label: "Accomodations"},
    {value: "living_preferences", label: "Living Preferences"},
    {value: "hobbies", label: "Hobbies"},
    {value: "contacts", label: "Contacts"},
  ]
  
  return (
    <div>
      <h2 className={styles.title} style={{marginTop:"3rem"}}>Optional Details</h2>
              
              <div style={{flexWrap:"wrap"}}>

              <MultiSelect options={options} state={optionalMulti} onChange={setOptionalMulti} placeholder={"Select Optional Details"}/>
              </div>
        
            
            { optionalMulti.some(item => item.value === options[0].value) &&
              <FloatingLabel controlId="floatingTextarea2" label="Description (500 Characters)" style={{margin:"1.5rem auto", zIndex:"0"}}>
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
                <SingleSelect label="Do You Smoke?" name="is_smoker" controlId={"isSmoker"} options={["Yes", "No"]} def={userDetails.isSmoker? "Yes": "No"} optionLabel={"Option"}/>
              }
              {
                optionalMulti.some(item => item.value === options[4].value) &&
                <SingleSelect label="Okay with Couples?" name="couples_ok" controlId={"couplesOk"} options={["Yes", "No"]} def={userDetails.couplesOk? "Yes": "No"} optionLabel={"Option"}/>
              }
              {
                optionalMulti.some(item => item.value === options[5].value) &&
                <SingleSelect label="Pet Owner?" name="pet_owner" controlId={"petOwner"} options={["Yes", "No"]} def={userDetails.petOwner? "Yes": "No"} optionLabel={"Option"}/>
              }
              {
                optionalMulti.some(item => item.value === options[6].value) &&
                <SingleSelect optionLabel={"Parking"} label="Parking Needed?" name="parking_needed" controlId={"parkingNeeded"}  options={["Yes", "No"]} def={userDetails.parkingNeeded? "Yes": "No"}/>
              }
                {
                  optionalMulti.some(item => item.value === options[2].value) &&
                  <div>
                    <SingleSelect controlId={"sleepSchedule"} name={"sleep_schedule"} options={["Early", "Late", "Varies"]} label={"Sleep Schedule"} def={userDetails.sleepSchedule? userDetails.sleepSchedule: null} optionLabel={"Hours"}/>
                  </div> 
                }
            </div>
              <div className={styles.inputGroup}>
              {
                optionalMulti.some(item => item.value === options[1].value) &&
               
                <InputGroup>
                  <FloatingInput controlId="stay_length" label="Stay Length" name={"stay_length"} type={"number"} defaultVal={userDetails.stayLength? userDetails.stayLength: null} required={true} min={1} max={50} />
                  <InputGroup.Text>Months</InputGroup.Text>
                </InputGroup>
              }

              {
                optionalMulti.some(item => item.value === options[7].value) &&
                <FloatingInput controlId="university" label="University Attended" name={"university"} type={"text"} defaultVal={userDetails.university || null} required={true}/>
              }

              {
                optionalMulti.some(item => item.value === options[8].value) &&
                <MultiSelect state={accomodations} onChange={setAccomodations} name={"accomodations"} placeholder={"Special Accomodations"} options={[
                  {value: "Pet Allergies", label: "Pet Allergies"},
                  {value: "Food Allergies", label: "Food Allergies"},
                  {value: "Wheelchair Accessibility", label: "Wheelchair Accessibility"},
                  {value: "Noise Sensitivity", label: "Noise Sensitivity"},
                  {value: "Light Sensitivity", label: "Light Sensitivity"},
                  {value: "Temperature Sensitivity", label: "Temperature Sensitivity"},
                  {value: "Guide Dog", label: "Guide Dog"},
                ]} required={true} />
              }
              {
                optionalMulti.some(item => item.value === options[9].value) &&
                <MultiSelect state={livingPreferences} onChange={setLivingPreferences} name={"living_preferences"} placeholder={"Living Preferences"} options={[
                  {value: "Near School", label: "Near School"},
                  {value: "LGBTQ Friendly", label: "LGBTQ Friendly"},
                  {value: "Private Bathroom", label: "Private Bathroom"},
                  {value: "Private Bedroom", label: "Private Bedroom"},
                  {value: "Quiet", label: "Quiet"},
                  {value: "Same Gendered Roommate", label: "Same Gendered Roommate"},
                ]} required={true} />
              }
              </div>
             
             {
               optionalMulti.some(item => item.value === options[10].value) &&
               <InputList label={"Hobbies"} state={hobbies} onChange={setHobbies}  limit={15} />
              }
              {
                optionalMulti.some(item => item.value === options[11].value) &&
                <InputList label={"Contacts"} state={contacts} onChange={setContacts}  limit={5} />
              }
    </div>
  )
}

export default Optionals
