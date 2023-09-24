import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [box,setBox] = useState(false)
    const [box2,setBox2] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setname] = useState('');
    const [bio, setbio] = useState('');
    const navigate =useNavigate()

    const handleSignup = async (e)=>{
        e.preventDefault();
        try {
        const response = await axios.post('/api/user/signup', { name,bio,email, password });
        const obj = {
            token:response.data.token,
            name:response.data.name }
        localStorage.setItem('token',JSON.stringify(obj));
        navigate('/')
        } catch (error) {
            setBox(true)
            setBox2(error.response.data.message)
            // console.error(error);
        }
    }
  return (
    <div className='signup'>
        <div className="form-holder" onSubmit={handleSignup}>
            <h3>Please Signup to Create Account..</h3>
            <form action="POST">
            {box ? <div className="box">{box2}</div> : ''}
                <input type="text" placeholder='Enter Username' value={name} onChange={(e) => setname(e.target.value)}/>
                <input type="text" placeholder='Enter Bio' value={bio} onChange={(e) => setbio(e.target.value)}/>
                <input type="text" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Signup</button>
            </form>
        </div>
    </div>
  )
}

export default Signup