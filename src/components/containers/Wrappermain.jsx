import React from 'react'
//fixed top-0 left-0 grid grid-cols-6
function Wrappermain({children}) {
  return (
    <div id='main-wrapper' className='bg-gray-950 flex items-start'>
        {children}
    </div>
  )
}

export default Wrappermain