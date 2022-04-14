import React from 'react'

const Notification = ({message}) => {
  if(message === null)
  return null;
  if(message.includes(`Added`) || message.includes(`Updated`))
  return (
    <div className='windows'>{message}</div>
  )
  if(message.includes(`already`))
  return (
    <div className='error'>{message}</div>
  )
}

export default Notification