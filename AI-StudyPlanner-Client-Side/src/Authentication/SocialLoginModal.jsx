
import React from "react";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const SocialLoginModal = ({ onClose }) => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
const axiosSecure = useAxiosSecure();


  // const handleGoogleSignIn = () => {
  //   signInWithGoogle()
  //     .then(result => {
  //       console.log(result.user);
        
  //       // SweetAlert 
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Login Successful!',
  //         text: 'Welcome to Study Planner',
  //         timer: 1500,
  //         showConfirmButton: false
  //       });
        
      
  //       if (onClose) onClose();
  //       navigate('/');
  //     })
  //     .catch(error => {
  //       console.log(error);
        
       
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Login Failed',
  //         text: error.message || 'Something went wrong',
  //         confirmButtonColor: '#6366f1'
  //       });
  //     });
  // };

const handleGoogleSignIn = () => {
  signInWithGoogle()
    .then(async (result) => {
      console.log(result.user);

      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        createdAt: new Date()
      };

      // MongoDB save
      const res = await axiosSecure.post('/users', userInfo);
      console.log(res.data);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome to Study Planner',
        timer: 1500,
        showConfirmButton: false
      });

      if (onClose) onClose();
      navigate('/');
    })
    .catch(error => {
      console.log(error);

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Something went wrong',
        confirmButtonColor: '#6366f1'
      });
    });
};



  return (
    <div className="flex flex-col gap-2 mt-3">
      <button 
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-gray-300 hover:text-white"
      >
        <FaGoogle className="text-red-500" />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLoginModal;