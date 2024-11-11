import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap'
import AutoComplete from "../NavsHeaders/AutoComplete"
import styles from "./profileroommatetab.module.css"
import Checkbox from '../Forms/Checkbox'
import SingleSelect from '../Forms/SingleSelect'
import MultiSelect from '../Forms/MultiSelect'
import InputList from '../Forms/InputList'
import useFetchUserDetails from '../../utils/useFetchUserDetails'

const ProfileRoommateTab = () => {

  const { userDetails } = useFetchUserDetails();

  const [city, setCity] = useState("");
  const [req, setReq] = useState({gender: "Male", sharing: "Yes"})
  const [cities, setCities] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [optionalMulti, setOptionalMulti] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [couplesOk, setCouplesOk] = useState(false);
  const [isSmoker, setIsSmoker] = useState(false);
  const [petOwner, setPetOwner] = useState(false);
  const [parkingNeeded, setParkingNeeded] = useState(false);
  const [moveInDate, setMoveInDate] = useState(Date(null));
  
  useEffect(() => {
    if (userDetails.cities) {
      setCities(userDetails.cities)
      setReq({
        budget: userDetails.budget,
        gender: userDetails.gender,
        age: userDetails.age,
        sharing: userDetails.isSharing
      })
      setContacts(userDetails.contacts || [])
      setCity(userDetails.hobbies || [])      

    }
    
  },[userDetails])

  const removeCity = (city) => {
    setCities((prev) => prev.filter(cities => {
      return (cities !== city)
    }))
  }

  const addCity = () => {
    if (cities.length !== 10){
      
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
      {value: "move_in_date", label: "Move In Date"},
      {value: "is_smoker", label: "Smoker"},
      {value: "stay_length", label: "Stay Length"},
      {value: "allergies", label: "Allergies"},
      {value: "couplesOk", label: "Ok With Couples"},
      {value: "pet_owner", label: "Pet Owner"},
      {value: "sleep_schedule", label: "Sleep Schedule"},
      {value: "sharing", label: "Sharing Details"},
      {value: "hobbies", label: "Hobbies"},
      {value: "parking_needed", label: "Parking"},
      {value: "contacts", label: "Contacts"},
    ]


  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>Update Roommate Details</h2>
        <Form>
            <InputGroup className={styles.citiesInputGroup} style={{zIndex:9999}}>
              <p style={{fontWeight:"600", marginRight:"20px"}}>Cities Of Interest* (Max-10)</p>
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
                <Form.Control type='number' placeholder='Age' min={18} max={99} defaultValue={20} required value={req.age || ""}
                onChange={(e) => setReq(prev => { return {...prev, age: e.target.value} })}/>
              </FloatingLabel>
            
              <FloatingLabel controlId='budget' label="Budget*" style={{zIndex:"0"}}>
                <Form.Control type='number' placeholder='Budget' step={100} min={100} required max={15000} value={req.budget || ""}
                onChange={(e) => setReq(prev => { return {...prev, budget: e.target.value} })}/>
              </FloatingLabel>
              
              <SingleSelect controlId={"gender"} label={"Gender*"} options={["Male", "Female", "Other"]} value={req.gender}
                onChange={(e) => setReq(prev => { return {...prev, gender: e.target.value} })}/>
              <SingleSelect controlId={"isSharing"} label={"Open to Sharing Room*"} options={["Yes", "No"]} value={req.sharing}
                onChange={(e) => setReq(prev => { return {...prev, sharing: e.target.value} })}/>
            </div>

            
            <h2 className={styles.title} style={{marginTop:"3rem"}}><hr/>Optional Details</h2>

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
                <Checkbox label="Okay with Couples?" name="couplesOk" value={couplesOk} onChange={setCouplesOk} />
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
                optionalMulti.some(item => item.value === options[1].value) &&
                <FloatingLabel label="Move In By:" controlId='move_in' style={{zIndex:0}}>
                  <Form.Control aria-label="Date" type="date" placeholder='Move In By' value={moveInDate} onChange={(e)=> setMoveInDate(e.target.value)}/>
                </FloatingLabel>
              }
              {
                optionalMulti.some(item => item.value === options[4].value) &&
              <MultiSelect state={allergies} onChange={setAllergies} name={"accomodations"} placeholder={"Accomodations"} options={[
                {value: "Pet Allergies", label: "Pet Allergies"},
                {value: "Food Allergies", label: "Food Allergies"},
                {value: "Wheelchair Accessibility", label: "Wheelchair Accessibility"},
                {value: "Noise Sensitivity", label: "Noise Sensitivity"},
                {value: "Light Sensitivity", label: "Light Sensitivity"},
                {value: "Temperature Sensitivity", label: "Temperature Sensitivity"},
                {value: "Guide Dog", label: "Guide Dog"},
                {value: "Shared Utility", label: "Shared Utility"},                
              ]}/>
              }
              </div>
             
              {
                optionalMulti.some(item => item.value === options[9].value) &&
                <InputList label={"Hobbies"} state={hobbies} onChange={setHobbies} color="black" limit={15} />
              }
              {
                optionalMulti.some(item => item.value === options[11].value) &&
                <InputList label={"Contacts"} state={contacts} onChange={setContacts} color="blue" limit={5} />
              }
        </Form>
      </div>
    </div>
  )
}

export default ProfileRoommateTab
