import React from 'react'

const TextInput = ({name, label, placeholder, state, onChange}) => {
  return (
    <div>
        <label htmlFor={name} >{label}</label>
        <input id={name} placeholder={placeholder} type='text' onChange={onChange} value={state}/>
    </div>
  )
}

export default TextInput
