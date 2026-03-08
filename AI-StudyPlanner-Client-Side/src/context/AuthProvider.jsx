import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';


const AuthProvider = ({children}) => {

const [user,setUser] = useState(null);
const [loading,setLoading] = useState(true);
const googleProvider = new GoogleAuthProvider();

 const createUser = (email,password)=>{
  setLoading(true);
  return createUserWithEmailAndPassword(auth,email,password);
 }

const signIn = (email,password) => {
   setLoading(true);
  return signInWithEmailAndPassword(auth,email,password);
}


  const logOut = () =>{
    setLoading(true);
    return signOut(auth);
  }



  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth,currentUser =>{
      setUser(currentUser);
      setLoading(false);
    });
    return()=>{
      unSubscribe();
    }
  },[])


  const signInWithGoogle = () =>{
    setLoading(true);
    return signInWithPopup(auth,googleProvider);
  }



  const authInfo = { createUser,signIn ,user,loading , logOut , signInWithGoogle}
  return (
    <AuthContext value={authInfo}>

    {children}
    </AuthContext>
  );
};

export default AuthProvider;