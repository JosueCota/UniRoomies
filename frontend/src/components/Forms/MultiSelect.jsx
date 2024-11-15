import React from 'react'
import Select from 'react-select'
import styles from "./multiselect.module.css"
const MultiSelect = ({options, state, onChange, name, placeholder, required}) => {
  return (
      <div className={styles.container}>
        <Select 
              options={options} 
              isMulti
              value={state}
              onChange={(newValue) => onChange(newValue)}
              name={name}
              placeholder={placeholder}
              className='basic-multi-select'
              classNamePrefix="select"
              maxMenuHeight="10rem"
              menuPlacement='auto'
              closeMenuOnSelect={false}
              required={required}
              />
        </div>
  )
}

export default MultiSelect
