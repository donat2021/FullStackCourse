import React, {useState,useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {
  const [persons,setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newnumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  },[])

  const deleteAccount = (event) => {
    event.preventDefault()
    const id = parseInt(event.target.value)
    const personName = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${personName.name}?`)){
      personService
      .remove(id)
      .then(response => {
          setPersons(persons.filter(person => person.id !== id))
      })
    }

  }

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
    personService
    .create(nameObject)
    .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
    })
      setNewName('')
      setNewNumber('')
    }
    else{
      if(window.confirm(`${newName} is already added to the phonebook replace the old number with the new one ?`))
      {
        const changedData = {...sameName,number:newnumber}
        personService.replace(changedData)
        .then(replaceData => {
          setPersons(persons.map(person => person.id===replaceData.id?replaceData:person))
        })
      }
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
      <Persons personTextbox={personTextbox} deleteAccount={deleteAccount}/>
    </div>
  )
}

export default App