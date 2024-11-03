import React, { useState } from 'react'
import { Button, Col, FloatingLabel, Form, InputGroup, Row } from 'react-bootstrap'
import AutoComplete from "../NavsHeaders/AutoComplete"
import styles from "./profileroommatetab.module.css"

const ProfileRoommateTab = () => {

  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);

  const removeCity = (city) => {
    setCities((prev) => prev.filter(cities => {
      return (cities !== city)
    }))
  }
  const addCity = () => {
    setCities((prev) => {
      if (!prev.includes(city)){
        return [...prev, city]
      }
      return prev 
    })
  }



  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>Update Roommate Details</h2>
        <Form>
          <Row>

            <InputGroup as={"Col"} className={styles.citiesInputGroup}>
              <p style={{fontWeight:"600", marginRight:"20px"}}>Cities of Interest</p>
              <div style={{width:"60%"}}>
                <AutoComplete address={city} onAddressChange={setCity}/>
              </div>
              <Button className={styles.addButton} onClick={addCity}>Add City</Button>
            </InputGroup>
          </Row>
          <Row>
            <div className={styles.citiesSelectedDiv}>
              <p>Cities Selected: </p> 
              <ul className={styles.citiesList}>
              {cities.map(citys => (
                <InputGroup className={styles.citiesSelected} id={`${citys}group`}>
                  <li className={styles.citiesListItems} id={`${citys}list`}>{citys}</li>
                  <Button id={`${citys}listbutton`} style={{backgroundColor: "white", border: "none", color:"black"}} onClick={() => removeCity(citys)} >X</Button>
                </InputGroup>
              ))}
              </ul>
            </div>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId='age' label="Age*">
                <Form.Control type='number' placeholder='Age' min={18} max={100} defaultValue={20} required/>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId='budget' label="Budget*">
              <Form.Control type='number' placeholder='Budget' step={100} min={100} required/>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId='gender' label="Gender*">
                <Form.Select required>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId='cooking' label="Cooking Freq">
                <Form.Select>
                  <option>Never</option>
                  <option>1-2 Days</option>
                  <option>3-4 Days</option>
                  <option>5-7 Days</option>
                </Form.Select>
            </FloatingLabel>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default ProfileRoommateTab
