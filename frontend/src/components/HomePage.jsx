import React from 'react'
import MessageContainer from './MessageContainer'
import Sidebarr from './Sidebarr'

function HomePage() {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-zinc-800 text-black bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50'>
      <Sidebarr/>
      <MessageContainer/>
    </div>
  )
}

export default HomePage