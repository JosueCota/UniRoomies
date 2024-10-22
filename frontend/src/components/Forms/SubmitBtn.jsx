import React from 'react'

const SubmitBtn = ({name, action}) => {
  return (
    <button onClick={action}>
        {name}
    </button>
  )
}

export default SubmitBtn
