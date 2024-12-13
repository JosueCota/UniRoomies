import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import styles from "./useredit.module.css"
import GeneralButton2 from "../Forms/GeneralButton2"
import { extractObjectArrayVal } from '../../utils/dataCleaning'
import { showToastError, showToastSuccess, showToastWarning } from '../../utils/helperFunctions'
import { useUpdateUserDetailsMutation } from '../../features/usersApiSlice'
import BasicInfo from "./BasicInfo"
import Optionals from "./Optionals"

//Edit form for user
const UserEdit = ({userDetails, refetch, setEditting, children}) => {

  const [updateDetails] = useUpdateUserDetailsMutation()

  const [cities, setCities] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [optionalMulti, setOptionalMulti] = useState([]);
  const [accomodations, setAccomodations] = useState([]);
  const [livingPreferences, setLivingPreferences] = useState([]);

  useEffect(() => {
    setCities(userDetails.cities? userDetails.cities: [])
    setHobbies( userDetails.hobbies? userDetails.hobbies: [])
    setAccomodations(userDetails.accomodations? userDetails.accomodations.map(val =>
      ({value: val, label: val})): [])
    setContacts(userDetails.contacts? userDetails.contacts: [])
    setLivingPreferences(userDetails.livingPreferences? userDetails.livingPreferences.map(val =>
      ({value: val, label: val})): [])
  }, [userDetails])
  
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
    if (optVal.includes("Living Preferences") && livingPreferences.length === 0 ){
      showToastWarning("Please Include some Preferences", "enterPrefsErr")
      valid = false;
    }
    if (optVal.includes("Accomodations") && accomodations.length === 0 ){
      showToastWarning("Please Include Some Accomodations", "enterAccomErr")
      valid = false;
    }
    return valid
  }

  const checkLists = (body) => {
    const optVal = extractObjectArrayVal(optionalMulti, "label")

    body["cities"] = cities;
    if (optVal.includes("Hobbies")) {
      body["hobbies"] = hobbies;
    }  
    if (optVal.includes("Contacts")) {
      body["contacts"] = contacts;
    }  
    if (optVal.includes("Living Preferences")) {
      const livP = extractObjectArrayVal(livingPreferences, "value")
      body["living_preferences"] = livP
    }
    if (optVal.includes("Accomodations")) {
      const acc = extractObjectArrayVal(accomodations, "value")
      body["accomodations"] = acc
    }
    return body
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const form  = new FormData(e.currentTarget);
    let body = {}

    if (validate()) {
      try {
        for (let [key, value] of form.entries()){
          if (value === "Yes") {
            value = true;
          } else if(value === "No") {
            value = false;
          }
          body[key] = value
        }
        
        body = checkLists(body);

        const res = await updateDetails(body).unwrap()

        //Wait for update in database, then refetch data (tags reset when updated)
        refetch()
        showToastSuccess("Updated User Details" + res.message)
        setEditting(false)

      } catch (err) {
        showToastError(err, "roommateDetailsErr")
      }
    }

  }

  return (

    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>Update User</h2>
        <p><strong>Note:</strong> Previously answered <strong>optional questions</strong> will <strong>not</strong> be removed from your information if not included in an update. You only need to include the information that needs updating.</p>
        <p><strong>Warning:</strong> Don't include any sensitive information like your personal location or any contact information if you would not like it to be public!</p>
        <Form onSubmit={handleSubmit} style={{width:"90%", margin:"0 auto"}}>
            <BasicInfo cities={cities} setCities={setCities} userDetails={userDetails}/>    
            <Optionals optionalMulti={optionalMulti} setAccomodations={setAccomodations} setContacts={setContacts} setHobbies={setHobbies} setOptionalMulti={setOptionalMulti} accomodations={accomodations} hobbies={hobbies} contacts={contacts} userDetails={userDetails} setLivingPreferences={setLivingPreferences} livingPreferences={livingPreferences}/>
            <div style={{marginTop:"2rem",display:"flex"}}>
              {children}
              <GeneralButton2 type={"submit"} name="Update"/>
            </div>
        </Form>
      </div>
    </div>
            )
}
        
export default UserEdit
        