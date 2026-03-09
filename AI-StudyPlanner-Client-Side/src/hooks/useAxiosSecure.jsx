// import axios from 'axios';
// import React from 'react';


// const axiosSecure = axios.create({
//   baseURL: `http://localhost:3000`
// });




// const useAxiosSecure = () => {
//   return axiosSecure
// };

// export default useAxiosSecure;


import axios from 'axios';
import React from 'react';
import useAuth from './UseAuth';


const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`
});




const useAxiosSecure = () => {
  const {user} = useAuth();
  axiosSecure.interceptors.request.use(config => {
    config.headers.Authorization=`Bearer ${user.accesToken}`
    return config;
  }, error =>{
    return Promise.reject(error);
  })
  return axiosSecure
};

export default useAxiosSecure;