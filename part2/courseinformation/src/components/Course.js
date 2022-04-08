import React from 'react'


const Header = ({ course }) => <h1>{course}</h1>


const Total = ({ exercises }) => {
  const sum = exercises.reduce((total, part) => total + part)
  return (
    <div>
      <p> <b> total of {sum} exercises</b> </p>
    </div>
  )
}


const Part = ({ name, exercises }) => {
  console.log(name, exercises)
  return(
    <p>
    {name} {exercises}
    </p>
  )
}
 

const Content = ({ parts }) =>
  <div>
    {parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />)}
  </div>



const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(part => part.exercises)} />

    </div>
  )

}

export default Course