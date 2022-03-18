const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content part1={course.parts[0].name} exercises1={course.parts[0].exercises} part2={course.parts[1].name} exercises2={course.parts[1].exercises} part3={course.parts[2].name} exercises3={course.parts[2].exercises}/>
      <Total total={course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises}/>
    </div>
  )
}
const Header = (props) =>
{
  return(
  <h1>{props.name}</h1>
  )
}
const Part = (props) =>
{
  return (
    <p>{props.part} {props.exercises}</p>
  )
}
const Content = (props) =>
 {
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1}/>
      <Part part={props.part2} exercises={props.exercises2}/>
      <Part part={props.part3} exercises={props.exercises3}/>
    </div>
  )
}
const Total = (props) =>
{
  return(
    <p>Exercise numbers {props.total}</p>
  )
}
export default App