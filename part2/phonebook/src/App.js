import React, {useState,useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'


const App = () => {
  const [persons,setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newnumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const hook = () => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
    console.log('promise fulfilled')
  }

  useEffect(hook,[])

  const personTextbox = persons.filter(person => person.name.includes(newSearch))

  const addDatas = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    let sameName = persons.find(person=> person.name === newName)
    if(typeof sameName === "undefined"){
      const nameObject = {
        name: newName,
        number: newnumber
    }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
    else{
      window.alert(window.alert(newName + ' is already added to phonebook'))
    }
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNoteChangeNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSearchField = (event) => {
    setNewSearch(event.target.value)
  } 


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter header="filter shown with"
      name={newSearch} handleFunction={handleSearchField} />
      <h2>Add a New</h2>
      <PersonForm addDatas={addDatas} newName={newName}
      handleNoteChange={handleNoteChange} newNumber={newnumber}
      handleNoteChangeNumber={handleNoteChangeNumber}/>
      <h2>Numbers</h2>
      <Persons personTextbox={personTextbox} />
    </div>
  )
}

export default App