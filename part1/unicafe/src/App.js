import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = good + bad + neutral
  let average = (good + neutral * 0 + bad * -1) / all

  return (
    <div>
      <Header />
      <Button handClick={() => setGood(good + 1)} text="good" />
      <Button handClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} />
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handClick}>
    {props.text}
  </button>
)

const Header = () => {
  return (
    <h1>give feedback</h1>
  )
}

const Statistics = (props) => {
  if(props.all===0)
  {
    return(
      <>
      <h1>Statistics</h1>
      <h3>No feedback given</h3>
      </>
    )  
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
      <StatisticLine text="good " value={props.good} />
      <StatisticLine text="neutral " value={props.neutral} />
      <StatisticLine text="bad " value={props.bad} />
      <StatisticLine text="all " value={props.all} />
      <StatisticLine text="average " value={props.average} />
      <StatisticLine text="positive " value={props.good / props.all + '%'} />
      </tbody>
      </table>
    </>
  )
}
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

export default App