import React from 'react'

const Persons = ({personTextbox,deleteAccount}) => {
  return (
   /* <div>{personTextbox.map((person,id) => <div key={id}>{person.name} {person.number}</div>)}
    </div>*/
    <div>{personTextbox.map(person =>
      <div key={person.id}>{person.name} {person.number}
      <button type="button" value={person.id} onClick={deleteAccount}>delete</button></div>)}
      </div>
  )
}

export default Persons