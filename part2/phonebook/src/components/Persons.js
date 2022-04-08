import React from 'react'


const Persons = ({personTextbox}) => {
  return (
    <div>{personTextbox.map((person,id) => <div key={id}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default Persons