import React from 'react'


const PersonForm = ({addDatas,newName,handleNoteChange,newnumber,handleNoteChangeNumber}) => {
  return (
    <div>
      <form onSubmit={addDatas}>
        <div>
          name: <input value={newName} onChange={handleNoteChange}/>
        </div>
        <div>
          number: <input value={newnumber} onChange={handleNoteChangeNumber}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm