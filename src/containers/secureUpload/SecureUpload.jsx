import React,{useState,useEffect,createContext,useContext} from 'react'
import {Routes,Route,Navigate,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Upload, Login} from '../../containers';
import {ProtectedRoute, AuthProvider} from '../../components';
import './secureUpload.css';
// import {AuthContext} from '../../components/authProvider/AuthProvider';


const SecureUpload = () => {
    return (
        <AuthProvider>
            <div className='secureUpload__container'>
                <Routes>
                    <Route index element={<Login/>}/>
                    <Route path="/" element={<Login/>}/>
                    <Route path="upload" element={<ProtectedRoute><Upload/></ProtectedRoute>}/>
                </Routes>
            </div>
        </AuthProvider>
    )
}

export default SecureUpload