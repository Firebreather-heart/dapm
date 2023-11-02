import React, { useContext, useState } from 'react'
import {auth, googleProvider } from '../Firebase/firebaseConfig';
import { signInWithPopup, signOut } from 'firebase/auth';
import { UserContext } from '../context/AuthContext';

const SignIn = () => {
    const { setUser, user } = useContext(UserContext);
    const [error, setError] = useState("")

    const SignInWithGoogle = async () => {
        try{
            await signInWithPopup(auth,googleProvider);
            setUser(true);
            setError("");
            console.log(auth.currentUser);
        }catch(err){
            console.error(err);
            setError("Something went wrong ");
        }
    }
    const Logout = async () => {
        try{
            await signOut(auth);
            setUser(false)
            setError("");
        }catch(err){
            if(err === "Firebase: Error (auth/internal-error)."){
                setError("Unable to logout. Check your internet connection");
            }else{
            console.log(err);
            setError(err.message);
            }
        }
    }


  return (
    <>
    <div className='flex items-center justify-center'>
    <div className='flex flex-col shadow rounded-lg mt-20 p-4 gap-10 justify-center w-[250px] items-center border h-[330px]'>
        <h1>Sign In to Continue</h1>
        {user ? (
            <button className='bg-blue-400' onClick={Logout}>Logout</button>
        ) : (
        <button className='bg-blue-400 p-2' onClick={SignInWithGoogle}>Continue With Google</button>
        ) }
    <p className='text-red-600'>{error}</p>
    </div>
    </div>
    </>
  )
}

export default SignIn