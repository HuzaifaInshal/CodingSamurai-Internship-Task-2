import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Option = ({isLogin , setIsLogin}) => {
    const login =()=>{
        setIsLogin(true)
    }
    const signup =()=>{
        setIsLogin(false)
    }
  return (
    <div className="title">
            <h1>Welcome to Todo Web</h1>
            <div className="option">
                <div className="choose">
                    <div className={isLogin ? "active cell" : "deactive cell"} onClick={login}>Login</div>
                    <div className={!isLogin ? "active cell" : "deactive cell"} onClick={signup}>Signup</div>
                </div>
            </div>
        </div>
  )
}

export default Option