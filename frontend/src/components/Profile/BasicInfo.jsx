import React, { useState } from 'react'
import { Button, Form, InputGroup, FloatingLabel } from 'react-bootstrap'
import AutoComplete from '../NavsHeaders/AutoComplete'
import SingleSelect from '../Forms/SingleSelect'
import styles from "./basicinfo.module.css"
import FloatingInput from '../Forms/FloatingInput'

//Required info for user profile
const BasicInfo = ({cities, userDetails, setCities}) => {
    const [city, setCity] = useState("");

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
  
    return (
    <div>
          <div className={styles.citiesContainer}>
          <InputGroup className={styles.citiesInputGroup} style={{zIndex:9999}}>
          <p style={{fontWeight:"600", marginRight:"20px"}}>Cities Of Interest* (Max-10)</p>
              <div style={{width:"100%"}} onKeyDown={(e) => e.key==="Enter" && addCity()} >
              <AutoComplete address={city} onAddressChange={setCity}/>
              </div>
              <Button className={styles.addButton} onClick={addCity}>Add City</Button>
              </InputGroup>
              <div className={styles.citiesSelectedDiv}>
              <p>Cities Selected: </p> 
              <ul className={styles.citiesList}>
              {cities.map(citys => (
                <InputGroup key={`${citys}group`} className={styles.citiesSelected} id={`${citys}group`} style={{zIndex:"0"}} onClick={() => removeCity(citys)}>
                  <li className={styles.citiesListItems} id={`${citys}list`} key={`${citys}cityName`} >{citys}</li>
                </InputGroup>
              ))}
              </ul>
            </div>
          </div>
            
            <div className={styles.inputGroup}>
              
              <FloatingInput type="number" required name={"age"} label={"Age"} defaultVal={userDetails.age || null} min={18} 
              max={99}/>
              
              <FloatingInput type={"number"} required name={"budget"} label={"Budget"} 
              defaultVal={userDetails.budget || null} step={50} min={100} max={15000} />

              <SingleSelect controlId={"gender"} label={"Gender*"} options={["Male", "Female", "Other"]} name={"gender"} def={userDetails.gender || null} optionLabel={"Gender"} />

              <SingleSelect name="room_sharing" controlId={"isSharing"} label={"Open to Sharing Room*"} def={userDetails.roomSharing? "Yes": "No"} optionLabel={"Sharing"} options={["Yes", "No"]}/>
            
              <FloatingInput type="date" required name={"move_in_date"} label={"Move In By"} defaultVal={userDetails.moveInDate || null} />
            </div>
    </div>
  )
}

export default BasicInfo
