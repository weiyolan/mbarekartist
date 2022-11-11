import React,{useState,useEffect,createContext,useContext} from 'react'
import {Navigate} from 'react-router-dom';
import {AuthContext} from '../../components/';


const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);

    // console.log('Trying to get in with token:')
    // console.log(token)

    if (!token) {
      return <Navigate to="/mbarek" replace />;
    }
  
    return children;
};

export default ProtectedRoute