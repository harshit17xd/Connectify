import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const Login = () => {

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      console.log(user);
      const res = await axios.post(`http://localhost:8080/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      // if(res.data.sucess){ 
        // toast.success(res.data.message);
        navigate("/"); 
        console.log(res.data);
        dispatch(setAuthUser(res.data));
      // }
      console.log(res);

    } catch (error) {
      toast.error(error.response.data.message)
      // if (isAxiosError(error)) {
      //   console.log(error.response.data)
      // }
    }
    
    setUser({
      username: "",
      password: "",
    })
  }

  return (
    <div className='min-w-96 m-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center'>Login</h1>
        <form onSubmit={onSubmitHandler} action="">

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-orange-400'> Username</span>
            </label>
            <input 
              value={user.username}
              onChange={(e)=>setUser({...user,username:e.target.value})}
              className='w-full input-bordered h-10 bg-white text-black'
              type="text"
              placeholder='Enter username' />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-orange-400'>Password</span>
            </label>
            <input 
              value={user.password}
              onChange={(e)=>setUser({...user,password:e.target.value})}
              className='w-full input-bordered h-10 bg-white text-black'
              type="password"
              placeholder='Enter your password' />
          </div>

          

          <div className='w-full mx-auto text-center mt-3'>
            {/* <Link to="/register"> */}
              <p className='text-center'>Don't have an account? <Link className='text-orange-400' to="/register">Signup</Link> </p>
            {/* </Link> */}
          </div>
          <div className='text-center mt-2'>
            <button type='submit' className="btn btn-active btn-ghost w-24 h-1">Login</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login