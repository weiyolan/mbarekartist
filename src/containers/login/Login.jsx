import React,{useState, useContext} from 'react';
import './login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import {AuthContext} from '../../components/';

const Login = (props) => {
    
    const { handleLogin } = useContext(AuthContext);

    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(username,password);
    }

  return (
    <div className='login__container'>
        <h1>Salaam Mbarek! Labes?</h1>
        <h1>Log in:</h1>
        <form onSubmit={handleSubmit}>
            <div className='form__group'>
                <label htmlFor='username'>Username: </label>
                <input id='username' autoComplete='on' type='text' name='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div><br/>
            <div className='form__group'>
                <label htmlFor='password'>Password:</label>
                <input id='password' autoComplete='on'type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div><br/>
            <Button type='submit'>Yella!</Button>
        </form>
    </div>
  )
}

export default Login