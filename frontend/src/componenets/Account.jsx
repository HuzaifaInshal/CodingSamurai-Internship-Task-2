import React,{useState} from 'react'
import Option from './Option';
import Login from './Login';
import Signup from './Signup';

const Account = () => {
    const [isLogin,setIsLogin] = useState(true)
  return (
    <>
    <Option isLogin={isLogin} setIsLogin={setIsLogin}/>
    {isLogin ? 
    <>
    <Login/>
    </>
    :
    <>
    <Signup/>
    </>
    }
    </>
  )
}

export default Account