import React from 'react'
import Select from 'react-select'

const MultiSelect = ({options, state, onChange, name, placeholder}) => {
  return (
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
            />
  )
}

export default MultiSelect
