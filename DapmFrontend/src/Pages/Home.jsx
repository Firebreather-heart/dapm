import React,{ useContext, useEffect, useState } from 'react'

import {auth } from '../Firebase/firebaseConfig';
import { signOut } from 'firebase/auth'

import { UserContext } from '../context/AuthContext'
const Home = () => {
  const [error, setError] = useState("");
const { setUser } = useContext(UserContext);
  const Logout = async () => {
    try{
      await signOut(auth);
      setUser(false);
    }catch(err){
      setError(err.message);
      console.error(err)
    }
  }



  return (
    <div>
        <nav className='flex justify-evenly p-2 items-center border-b-2 w-full'>
            <h1 className=' text-blue-400 font-bold'>Dapm</h1>
            <div className="flex px-3 border items-center rounded-md ">
                <input className='bg-transparent p-2 outline-none' placeholder='Enter a prompt' type="search" />
                <button className='bg-blue-400 rounded h-[30px] text-base px-2'>Search</button>
            </div>
            <button onClick={Logout} className='bg-blue-400 rounded h-[30px] text-base px-2'>Logout</button>
        </nav>
        <h3 className='text-red-500 text-center'>{error}</h3>
    </div>
  )
}

export default Home