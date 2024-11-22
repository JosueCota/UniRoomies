import React from 'react'
import styles from "./searchheader.module.css"
import AutoComplete from './AutoComplete'
import { FiRefreshCw  } from 'react-icons/fi'

const SearchHeader = ({placeholder, onClick, address, budget, setBudget, setAddress}) => {

  const handleAddressChange = (address) => {
    setAddress(address)
  }

  return (
    <div className={styles.headerContainer} >
      <div className={`${styles.inputDiv} ${styles.searchBar}`} style={{width: "40%", minWidth:"100px"}}>
          <AutoComplete onAddressChange={handleAddressChange} address={address} name={"location"}/>
      </div>
      <div className={styles.inputDiv} style={{width: "10%", minWidth:"100px"}}>
          <input id={placeholder} placeholder={placeholder} type='number' className={styles.numberInput} max={15000} step={50} min={100} value={budget} onChange={(e) => setBudget(e.target.value)}/>
      </div>
        <button className={styles.searchButton} onClick={onClick}>
          <FiRefreshCw size={35}/>
        </button>
      
        </div>
  )
}

export default SearchHeader
