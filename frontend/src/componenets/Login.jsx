import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [box,setBox] = useState(false)
    const [box2,setBox2] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (e)=>{
        e.preventDefault();
        try {
        const response = await axios.post('/api/user/login', { email, password });
            const obj = {
                token:response.data.token,
                name:response.data.name }
            localStorage.setItem('token',JSON.stringify(obj));
            navigate('/')
        } catch (error) {
            setBox(true)
            setBox2(error.response.data.message)
            // console.log(error);
        }
    }
  return (
    <div className='login'>
        <div className="form-holder" onSubmit={handleLogin}>
            <h3>Please Login to continue..</h3>
            <form action="POST">
                {box ? <div className="box">{box2}</div> : ''}
                <input type="text" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login