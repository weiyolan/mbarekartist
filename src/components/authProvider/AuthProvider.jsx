import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from '../../components/';
import Toast from 'react-bootstrap/Toast';

const AuthProvider = ({ children }) => {
    const [token,setToken] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (username,password) => {
        // var formData = new FormData(e.target);
        // console.log(Object.fromEntries(formData))
        // console.log(e.target)
        let data = {
            username: username,
            password: password
        }

        await axios.post('http://localhost:4000/auth/login', data,{
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }}).then((res)=>{
            setToken(res.data.token);
            // console.log(res.data.token);
            // console.log('Logged in!');
        }).catch((e)=>{
            alert('❌❌❌ Error! ❌❌❌ \n Message: ' + e)
            console.log('Authentication error.')
            console.log(e)
        });
    };

    useEffect(()=>{
        if (token) {
            navigate('upload');
        };
    },[token])
  
    const value = {
      token,
      handleLogin: handleLogin,
    };
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
};

export default AuthProvider