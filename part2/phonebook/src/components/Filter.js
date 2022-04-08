import React from 'react'


const Filter = ({header,name,handleFunction}) => {
    return (
      <div>{header}<input value={name} onChange={handleFunction} />
      </div>
    )
  }
  
  export default Filter