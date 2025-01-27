import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux';

const OtherUsers = () => {
    //my custom hooks
    useGetOtherUsers();
    const {OtherUsers} = useSelector(store=>store.user)
    if(!OtherUsers){
      return;       //early return
    }
  return (
    <div className='overflow-auto flex-1'>
        {
          OtherUsers?.map((user)=>{
            return(
              <OtherUser key={user._id} user={user}/>
            )
          })
        }
        {/* <OtherUser/>
        <OtherUser/>
        <OtherUser/>
        <OtherUser/>
        <OtherUser/>
        <OtherUser/>
        <OtherUser/>
        <OtherUser/> */}
    </div>
  )
}

export default OtherUsers