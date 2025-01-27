import React from 'react'
import { useDispatch,useSelector} from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
const OtherUser = ({ user }) => {
    // const user = props.user
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store => store.user)
    const selectedUserHandler = (user) => {
        // console.log(user);
        dispatch(setSelectedUser(user));
    }

    return (
        <>
            <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-zinc-200 text-brown-950' : ''} flex gap-2 items-center  text-white hover:text-zinc-700 hover:bg-zinc-200 rounded p-2 cursor-pointer`}>
                <div className='avatar online'>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePhoto} alt="user-pp" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-3'>
                        <p>{user?.fullname}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </>
    )
}

export default OtherUser