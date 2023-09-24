import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token'); //returns boolean
    useEffect(()=>{
      if(isAuthenticated){
        navigate('/dash')
      }else{
        navigate('/account')
      }
    },[])
  return (
    <>
    main
    </>
  )
}

export default Main