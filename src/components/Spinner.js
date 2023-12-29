import React from 'react'
import loading from './load.gif'

export default function spinner() {
  return (
    <div className='text-center'>
      <img className="my-3" src={loading} alt="" />
    </div>
  )
}
