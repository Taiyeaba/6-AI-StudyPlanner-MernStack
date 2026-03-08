import React from "react";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/UseAuth";

const SocialLoginModal = () => {


const {signInWithGoogle} = useAuth();

const handleGoogleSignIn = () => {
  signInWithGoogle()
  .then(result => {
    console.log(result.user)
  })
  .catch(error => {
    console.log(error);
  })
}




  return (
    <div className="flex flex-col gap-2 mt-3">
      <button 
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-gray-300 hover:text-white">
        <FaGoogle className="text-red-500" />
        Continue with Google
      </button>
    </div>
  );
};



export default SocialLoginModal;