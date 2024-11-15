import React, { useState } from 'react'
import styles from "./searchheader.module.css"
import AutoComplete from './AutoComplete'
import { useSelector } from 'react-redux'
import { setRoommateSearch, setRoomSearch } from '../../features/searchesSlice'
import { useDispatch } from 'react-redux'
import { IoSearchCircleSharp  } from 'react-icons/io5'

const SearchHeader = ({placeholder, type}) => {
  
  //Later I will pass props instead of using type var (seems more appropriate)
  const dispatch = useDispatch();
  const { roommateSearch, roomSearch } = useSelector((state) => state.search);
  const { budget, setBudget } = useState()
  const handleAddressChange = (address) => {
    if (type==="roommate") {
      dispatch(setRoommateSearch(address))
    } else {  
      dispatch(setRoomSearch(address))
    }
  }

  return (
    <div className={styles.headerContainer} >
      <div className={`${styles.inputDiv} ${styles.searchBar}`} style={{width: "40%", minWidth:"100px"}}>
          <AutoComplete onAddressChange={handleAddressChange} address={type === "roommate"? roommateSearch || "": roomSearch || ""}/>
      </div>
      <div className={styles.inputDiv} style={{width: "10%", minWidth:"100px"}}>
          <input id={placeholder} placeholder={placeholder} type='number' className={styles.numberInput} max={15000} step={50} min={100} value={budget} onChange={(e) => setBudget(e.target.value)}  />
      </div>
      <div className={`${styles.searchButton}`}>
          <IoSearchCircleSharp size={35}/>
      </div>
      
    </div>
  )
}

export default SearchHeader
