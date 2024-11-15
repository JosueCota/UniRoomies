import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap'
import AutoComplete from "../NavsHeaders/AutoComplete"
import styles from "./profileroommatetabedit.module.css"
import Checkbox from '../Forms/Checkbox'
import SingleSelect from '../Forms/SingleSelect'
import MultiSelect from '../Forms/MultiSelect'
import InputList from '../Forms/InputList'
import SubmitBtn from "../Forms/SubmitBtn"
import { arrayToString, extractObjectArrayVal } from '../../utils/dataCleaning'
import { showToastError, showToastSuccess, showToastWarning } from '../../utils/helperFunctions'
import { useUpdateUserDetailsMutation } from '../../features/usersApiSlice'

const ProfileRoommateTabEdit = ({userDetails, refetch }) => {

  const [updateDetails, isLoading] = useUpdateUserDetailsMutation()
  const [city, setCity] = useState("");
  const [cities, setCities] = useState(userDetails.cities || []);
  
  const [contacts, setContacts] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [optionalMulti, setOptionalMulti] = useState([]);
  const [accomodations, setAccomodations] = useState([]);

  useEffect(() => {
    setCities(prev=> userDetails.cities? userDetails.cities: [])
  }, [userDetails])

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
    {value: "accomodations", label: "Accomodations"},
    {value: "couplesOk", label: "Ok With Couples"},
    {value: "pet_owner", label: "Pet Owner"},
    {value: "sleep_schedule", label: "Sleep Schedule"},
    {value: "sharing", label: "Sharing Details"},
    {value: "hobbies", label: "Hobbies"},
    {value: "parking_needed", label: "Parking"},
    {value: "contacts", label: "Contacts"},
  ]
  
  const validate = () => {
    const optVal = extractObjectArrayVal(optionalMulti, "label")
    let valid = true;
    if (optVal.includes("Contacts") && contacts.length === 0 ){
      showToastWarning("Please Enter Some Forms of Contact", "enterContactsErr")
      valid = false;
    }
    if (cities.length === 0){
      showToastWarning("Please Enter Some Cities", "enterCitiesErr")
      valid = false;
    }
    if (optVal.includes("Hobbies") && hobbies.length === 0 ){
      showToastWarning("Please Enter Some Hobbies", "enterHobbiesErr")
      valid = false;
    }
    
    return valid
  }

  const checkLists = (body) => {
    const optVal = extractObjectArrayVal(optionalMulti, "label")
    if (optVal.includes("Hobbies")) {
      body["hobbies"] = arrayToString(hobbies);
    }  
    if (optVal.includes("Contacts")) {
      body["contacts"] = arrayToString(contacts);
    }  
    if (optVal.includes("Accomodations")) {
      const acc = extractObjectArrayVal(accomodations, "value")
      body["accomodations"] = arrayToString(acc);
    }
    return body
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const form  = new FormData(e.currentTarget);
    let body = {}

    if (validate()) {
      try {
        for (const [key, value] of form.entries()){
          body[key] = value
        }
        body["cities"] = arrayToString(cities);
        body = checkLists(body);

        const res = await updateDetails(body).unwrap()
        //Wait for update in database, then refetch data (tags reset when updated)
        refetch()
        showToastSuccess("Updated User Details" + res.message)
      } catch (err) {
        showToastError(err, "roommateDetailsErr")
      }
    }

  }
  
  // if(isLoading) {
  //   return <Loader/>
  // }

  return (

    <div className={styles.page}>
      <div className={styles.container}>
      <h2 className={styles.title}>Update Roommate Details</h2>
      <Form onSubmit={handleSubmit}>
          <div className={styles.citiesContainer}>
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
                <InputGroup className={styles.citiesSelected} id={`${citys}group`} style={{zIndex:"0"}} onClick={() => removeCity(citys)}>
                  <li className={styles.citiesListItems} id={`${citys}list`}>{citys}</li>
                </InputGroup>
              ))}
              </ul>
            </div>
          </div>
            
            <div className={styles.inputGroup1}>
              <FloatingLabel controlId='age' label="Age*" style={{zIndex:"0"}}>
              <Form.Control name='age' type='number' placeholder='Age' min={18} max={99} required defaultValue={userDetails.age || null}
              />
              </FloatingLabel>
              
              <FloatingLabel controlId='budget' label="Budget*" style={{zIndex:"0"}}>
              <Form.Control name='budget' type='number' placeholder='Budget' step={50} min={100} required max={15000} defaultValue={userDetails.budget || null}
              />
              </FloatingLabel>
              
              <SingleSelect controlId={"gender"} label={"Gender*"} options={["Male", "Female", "Other"]} name={"gender"}/>

              <Checkbox name="room_sharing" controlId={"isSharing"} label={"Open to Sharing Room*"} defaultValue={userDetails.sharing}
              />
              </div>
              
              
              <h2 className={styles.title} style={{marginTop:"3rem"}}><hr/>Optional Details</h2>
              
              <div style={{marginBottom:"20px", width:"90%", margin:"0px auto auto auto"}}>
              <MultiSelect options={options} value={optionalMulti} onChange={setOptionalMulti} placeholder={"Select Optional Details"}/>
            </div>
            
            
            
            
            { optionalMulti.some(item => item.value === options[0].value) &&
              <FloatingLabel controlId="floatingTextarea2" label="Description (500 Characters)" style={{width:"90%" , margin:"20px auto", zIndex:"0"}}>
              <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              name='roommate_desc'
              defaultValue={userDetails.description || ""}
              style={{ marginBottom: "20px", height:"fit-content"}}
              maxLength={500}
              required
              />
              </FloatingLabel>
            }
            
            
            
            <div className={styles.booleanInputs}>
              {
                optionalMulti.some(item => item.value === options[5].value) &&
                <Checkbox label="Okay with Couples?" name="couples_ok" defaultValue={userDetails.couplesOk || false}/>
              }
              {
                optionalMulti.some(item => item.value === options[2].value) &&
                <Checkbox label="Do You Smoke?" name="is_smoker" defaultValue={userDetails.isSmoker}/>
              }
              {
                optionalMulti.some(item => item.value === options[6].value) &&
                <Checkbox label="Pet Owner?" name="pet_owner" defaultValue={userDetails.petOwner || false} />
              }
              {
                optionalMulti.some(item => item.value === options[10].value) &&
                <Checkbox label="Parking Needed?" name="parking_needed" defaultChecked={userDetails.parkingNeeded || false}/>
              }
            </div>
              <div className={styles.inputGroup2}>
              {
                optionalMulti.some(item => item.value === options[7].value) &&
                <div style={{width:"10rem"}}>
                  <SingleSelect controlId={"sleepSchedule"} name={"sleep_schedule"} options={["Early", "Late", "Varies"]} label={"Sleep Schedule"}/>
                </div>
              }
              {
                optionalMulti.some(item => item.value === options[3].value) &&
                <div style={{display:"flex", width:"max-content", flexFlow:"column"}}>
                    <Form.Label htmlFor=''><strong>Stay Length</strong></Form.Label>
                    <InputGroup>
                  <Form.Control id='stay_length' label="Time" type='number' name='stay_length' min={1} required placeholder='Stay Length'/>
                  <InputGroup.Text>Months</InputGroup.Text>
                    </InputGroup>
                </div>
              }

              {
                optionalMulti.some(item => item.value === options[1].value) &&
                <FloatingLabel label="Move In By:" controlId='move_in' style={{zIndex:0}}>
                  <Form.Control name='move_in_date' aria-label="Date" type="date" placeholder='Move In By' defaultValue={userDetails.moveInDate || null}  required/>
                </FloatingLabel>
              }
              {
                optionalMulti.some(item => item.value === options[4].value) &&
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
               optionalMulti.some(item => item.value === options[9].value) &&
               <InputList label={"Hobbies"} state={hobbies} onChange={setHobbies} color="black" limit={15} />
              }
              {
                optionalMulti.some(item => item.value === options[11].value) &&
                <InputList label={"Contacts"} state={contacts} onChange={setContacts} color="blue" limit={5} />
              }
              <hr/>
              <SubmitBtn name="Update" />
              </Form>
              </div>
              </div>
            )
}
        
export default ProfileRoommateTabEdit
        