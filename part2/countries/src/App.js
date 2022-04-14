import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Weather = ({city}) => {
const[weatherPlace,setWEatherPlace] = useState(null)
const hook2 = () => {
  /*const apiKey="c9ef517abfa26e8a6c70aa0549f226fc"*/
  const api_key = process.env.REACT_APP_API_KEY
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
  .then(response => {
    setWEatherPlace(response.data)
  })
}
useEffect(hook2,[])
if(weatherPlace===null) return null
return (
  <div>
      <div><b>Temperature is </b>{weatherPlace.main.temp} Celcius</div>
      <div><img alt="title" src={`http://openweathermap.org/img/wn/${weatherPlace.weather[0].icon}@2x.png`} height="100" width="100"/> </div>
      <div><b>wind:</b>{weatherPlace.wind.speed} m/s</div>
  </div>
)
}
const CountriesWrite = ({setSearchWord,showCountries}) => {
  if (showCountries.length === 1) {
    return (
      <div>
        <h1>{showCountries[0].name.common}</h1>
        <div>
        capital {showCountries[0].capital.toString()}
        </div>
        <div>
        area {showCountries[0].area.toString()}
        </div>
        <div>
        <h3>languages</h3>
        <ul>
        {Object.values(showCountries[0].languages).map(
          language => <li key={language}>{language}</li>
        )}
        </ul>
        <div>
        <img alt="title" src={showCountries[0].flags.png} height="100" width="100" />
        </div>
        <h3>Weather in {showCountries[0].capital.toString()}</h3>
        <Weather city={showCountries[0].capital.toString()} /> 
        </div>
      </div>
    )
  }
  else if(showCountries.length<=10)
  {
    return(
      <div>
        {showCountries.map((countries)=><div key={countries.name.common}>{countries.name.common}
         <button type="button" value={countries.name.common} onClick={() => setSearchWord(countries.name.common)}>show</button></div>)}
        </div>
    )
  }
  else{
    return (
      <div>
     Too many matches
      </div>
    )
  }
}
const App = () => {
  const [countries,setCountries] = useState([])
  const [searchWord,setSearchWord] = useState('')

  const hook = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }

  useEffect(hook,[])


  const showCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchWord.toLowerCase()))
  console.log(showCountries)

  const handleSearchChange = (event) => {
    setSearchWord(event.target.value)
  }
  return (
    <div>
    <div>
      find countries <input value={searchWord} onChange={handleSearchChange}/>
    </div>
    <CountriesWrite showCountries={showCountries} setSearchWord={setSearchWord}/>
    
    </div>
  );
}
export default App;