import React, { useState } from 'react'
import { Button, Form, InputGroup, FloatingLabel } from 'react-bootstrap'
import AutoComplete from '../NavsHeaders/AutoComplete'
import SingleSelect from '../Forms/SingleSelect'
import styles from "./basicinfo.module.css"

const BasicInfo = ({cities, userDetails, setCities}) => {
    const [city, setCity] = useState("");

    const removeCity = (city) => {
        setCities((prev) => prev.filter(cities => {
          return (cities !== city)
        }))
      }
      
      const addCity = () => {
        console.log("click")
        console.log(cities.length)
        console.log(userDetails)
        if (cities.length !== 10){
          
          setCities((prev) => {
            if (!prev.includes(city)){
              return [...prev, city]
            }
            return prev 
          })
        }
      }
  
    return (
    <div>
          <div className={styles.citiesContainer}>
          <InputGroup className={styles.citiesInputGroup} style={{zIndex:9999}}>
          <p style={{fontWeight:"600", marginRight:"20px"}}>Cities Of Interest* (Max-10)</p>
              <div style={{width:"60%"}} onKeyDown={(e) => e.key==="Enter" && addCity()} >
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
              
              <SingleSelect controlId={"gender"} label={"Gender*"} options={["Male", "Female", "Other"]} name={"gender"} def={userDetails.gender || null} optionLabel={"Gender"} />

              <SingleSelect name="room_sharing" controlId={"isSharing"} label={"Open to Sharing Room*"} def={userDetails.roomSharing? "Yes": "No"} optionLabel={"Sharing"} options={["Yes", "No"]}/>
              
              <FloatingLabel label="Move In By:" controlId='move_in' style={{zIndex:0}}>
              <Form.Control name='move_in_date' aria-label="Date" type="date" placeholder='Move In By' defaultValue={userDetails.moveInDate || null}  required/>
              </FloatingLabel>
            </div>
    </div>
  )
}

export default BasicInfo
