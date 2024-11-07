import React, { useEffect, useState } from 'react'
import styles from "./searchheader.module.css"
import AutoComplete from './AutoComplete'
import { useSelector } from 'react-redux'
import { setRoommateSearch, setRoomSearch } from '../../features/searchesSlice'
import { useDispatch } from 'react-redux'

const SearchHeader = ({placeholder, type}) => {
  
  const dispatch = useDispatch();
  const { roommateSearch, roomSearch } = useSelector((state) => state.search);

  const handleAddressChange = (address) => {
    if (type==="roommate") {
      dispatch(setRoommateSearch(address))
    } else {  
      dispatch(setRoomSearch(address))
    }
  }

  return (
    <div className={styles.headerContainer} >
      <div className={styles.inputDiv} style={{width: "40%", minWidth:"100px"}}>
          <AutoComplete onAddressChange={handleAddressChange} address={type === "roommate"? roommateSearch || "": roomSearch || ""}/>
      </div>
      <div className={styles.inputDiv} style={{width: "10%", minWidth:"100px"}}>
      <input id={placeholder} placeholder={placeholder} type='number' className={styles.numberInput} max={50000} step={100} min={100}/>
      </div>
    </div>
  )
}

export default SearchHeader
