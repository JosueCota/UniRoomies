import React, { useState } from 'react'
import { Button, FloatingLabel, Form, InputGroup, Row } from 'react-bootstrap'
import AutoComplete from "../NavsHeaders/AutoComplete"
import styles from "./profileroommatetab.module.css"
import Checkbox from '../Forms/Checkbox'
import SingleSelect from '../Forms/SingleSelect'
import MultiSelect from '../Forms/MultiSelect'

const ProfileRoommateTab = () => {

  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [optionalMulti, setOptionalMulti] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [couples_ok, setCouplesOk] = useState(false);
  const [isSmoker, setIsSmoker] = useState(false);
  const [petOwner, setPetOwner] = useState(false);
  const [parkingNeeded, setParkingNeeded] = useState(false);

  const removeCity = (city) => {
    setCities((prev) => prev.filter(cities => {
      return (cities !== city)
    }))
  }

  const addCity = () => {
    if (cities.length !== 5){

      setCities((prev) => {
        if (!prev.includes(city)){
          return [...prev, city]
        }
        return prev 
      })
    }
    }

    const options = [
      {value: "description", label: "Description"},
      {value: "move-in-date", label: "Move In Date"},
      {value: "is-smoker", label: "Smoker"},
      {value: "stay-length", label: "Stay Length"},
      {value: "allergies", label: "Allergies"},
      {value: "couples-ok", label: "Ok With Couples"},
      {value: "pet-owner", label: "Pet Owner"},
      {value: "sleep-schedule", label: "Sleep Schedule"},
      {value: "sharing", label: "Sharing Details"},
      {value: "hobbies", label: "Hobbies"},
      {value: "parking-needed", label: "Parking Needed"},
      {value: "contacts", label: "Contacts"},
    ]


  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>Update Roommate Details</h2>
        <Form>
            <InputGroup className={styles.citiesInputGroup} style={{zIndex:0}}>
              <p style={{fontWeight:"600", marginRight:"20px"}}>Cities Of Interest* (Max-5)</p>
              <div style={{width:"60%"}} onKeyDown={(event) => {event.key === "Enter" && addCity()}}>
                <AutoComplete address={city} onAddressChange={setCity}/>
              </div>
              <Button className={styles.addButton} onClick={addCity}>Add City</Button>
            </InputGroup>
          
            <div className={styles.citiesSelectedDiv}>
              <p>Cities Selected: </p> 
              <ul className={styles.citiesList}>
              {cities.map(citys => (
                <InputGroup className={styles.citiesSelected} id={`${citys}group`} style={{zIndex:"0"}}>
                  <li className={styles.citiesListItems} id={`${citys}list`}>{citys}</li>
                  <Button id={`${citys}listbutton`} style={{backgroundColor: "white", border: "none", color:"black"}} onClick={() => removeCity(citys)} >X</Button>
                </InputGroup>
              ))}
              </ul>
            </div>
            
            <div className={styles.inputGroup1}>
              <FloatingLabel controlId='age' label="Age*" style={{zIndex:"0"}}>
                <Form.Control type='number' placeholder='Age' min={18} max={100} defaultValue={20} required/>
              </FloatingLabel>
            
              <FloatingLabel controlId='budget' label="Budget*" style={{zIndex:"0"}}>
                <Form.Control type='number' placeholder='Budget' step={100} min={100} required/>
              </FloatingLabel>
              
              <SingleSelect controlId={"gender"} label={"Gender*"} options={["Male", "Female", "Other"]}/>
              <SingleSelect controlId={"isSharing"} label={"Open to Sharing Room*"} options={["Yes", "No"]}/>
              
            </div>

            <div style={{marginBottom:"20px", width:"90%", margin:"0px auto auto auto"}}>
              <MultiSelect options={options} value={optionalMulti} onChange={setOptionalMulti} placeholder={"Select Optional Details"} name={"optionals"}/>
            </div>
            
              { optionalMulti.some(item => item.value === options[0].value) &&
              <FloatingLabel controlId="floatingTextarea2" label="Description" style={{width:"90%" , margin:"20px auto", zIndex:"0"}}>
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '100px', marginBottom: "20px"}}
                  />
              </FloatingLabel>
                }



              <div className={styles.booleanInputs}>
              {
                optionalMulti.some(item => item.value === options[5].value) &&
                <Checkbox label="Okay with Couples?" name="couples_ok" value={couples_ok} onChange={setCouplesOk} />
              }
              {
                optionalMulti.some(item => item.value === options[2].value) &&
                <Checkbox label="Do You Smoke?" name="is_smoker" value={isSmoker} onChange={setIsSmoker} />
              }
              {
                optionalMulti.some(item => item.value === options[6].value) &&
                <Checkbox label="Pet Owner?" name="pet_owner" value={petOwner} onChange={setPetOwner} />
              }
              {
                optionalMulti.some(item => item.value === options[10].value) &&
                <Checkbox label="Parking Needed?" name="parking_needed" value={parkingNeeded} onChange={setParkingNeeded} />
              }
              </div>
              
              <div className={styles.inputGroup2}>
              {
                optionalMulti.some(item => item.value === options[7].value) &&
                <div style={{width:"10rem"}}>
                  <SingleSelect options={["Early", "Late", "Varies"]} label={"Sleep Schedule"}/>
                </div>
              }
              {
                optionalMulti.some(item => item.value === options[3].value) &&
                <div style={{display:"flex", width:"max-content"}}>
                  <FloatingLabel controlId='stayLength' label="Stay Length" style={{zIndex:0}}>
                  <Form.Control label="Time" type='number' max={12}/>
                  </FloatingLabel>
                  <SingleSelect options={["Year(s)", "Month(s)"]} label={"Time Frame"}/>
                </div>
              }
              {
                optionalMulti.some(item => item.value === options[4].value) &&
              <MultiSelect state={allergies} onChange={setAllergies} name={"accomodations"} placeholder={"Accomodations"} options={[
                {value: "Pet Allergies", label: "Pet Allergies"},
                {value: "Food Allergies", label: "Food Allergies"},
                {value: "Disabilities", label: "Disability"},
                
              ]}/>
              }
              </div>

        </Form>
      </div>
    </div>
  )
}

export default ProfileRoommateTab
