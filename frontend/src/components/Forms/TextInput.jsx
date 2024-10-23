import React from 'react'

const TextInput = ({name, label, placeholder, state, onChange, required, type, maxChar}) => {
  return (
    <div style={{width:"90%"}} className='mb-3 col' >
        <label className="form-label "  htmlFor={name} >{label}</label>
        <input className="form-control" id={name} placeholder={placeholder} type={type} onChange={onChange} value={state} required={required} name={name} maxLength={maxChar}/>
    </div>
  )
}

export default TextInput
