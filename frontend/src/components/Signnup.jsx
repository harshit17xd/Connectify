import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios, {isAxiosError} from "axios";
import toast from "react-hot-toast";

const Signnup = () => {

  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleChecbox = (gender) => {
    setUser({ ...user, gender })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    //console.log(user);
    try {
      console.log(user);
      const res = await axios.post(`http://localhost:8080/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if(res.data.sucess){ 
        toast.success(res.data.message);
        navigate("/login"); 
      }
      console.log(res);

    } catch (error) {
      toast.error(error.response.data.message)
      // if (isAxiosError(error)) {
      //   console.log(error.response.data)
      // }
    }
    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }


  return (
    <div className='min-w-96 m-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center'>SignUp</h1>
        <form onSubmit={onSubmitHandler} action="">

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-orange-400'>Full name</span>
            </label>
            <input
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              className='w-full input-bordered h-10 bg-white text-black'
              type="text"
              placeholder='Enter your name' />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-orange-400'> Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input-bordered h-10 bg-white text-black'
              type="password"
              placeholder='Enter your password' />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-orange-400'>Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='w-full input-bordered h-10 bg-white text-black'
              type="password"
              placeholder='Confirm your password' />
          </div>

          <div>
            <div className='flex items-center mt-2 py-2'>
              <div className='flex items-center'>
                <p>Male</p>
                <input
                  type="checkbox" defaultChecked
                  checked={user.gender === "male"}
                  onChange={() => handleChecbox("male")}
                  className="checkbox checkbox-warning mx-2" />
              </div>
              <div className='flex items-center'>
                <p>Female</p>
                <input
                  type="checkbox" defaultChecked
                  checked={user.gender === "female"}
                  onChange={() => handleChecbox("female")}
                  className="checkbox checkbox-warning mx-2" />
              </div>
            </div>
          </div>

          <div className='w-full mx-auto text-center'>
            {/* <Link to="/login"> */}
            <p className='text-center'>Already have an account? <Link className='text-orange-400' to="/login"> Login</Link></p>
            {/* </Link> */}
          </div>
          <div className='text-center mt-2'>
            <button type='submit' className="btn btn-active btn-ghost w-32 h-1">Signup</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Signnup