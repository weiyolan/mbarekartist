import React,{useState} from 'react';
import {Route,Routes} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {Gallery, Header,Home,Lightbox,SecureUpload} from './containers';


function App() {

    let [lightboxFlag, setLightboxFlag] = useState(false);

    const contactAppear = () => {
        setLightboxFlag(true);
    };

    const contactDisppear = () => {
        setLightboxFlag(false);
    };

    const lightboxEffect = (event) => {
        if (lightboxFlag && event.target === document.getElementById('light-box')) {
            contactDisppear();
        };
    };

    return (
        <div className="App" onClick={lightboxEffect} > 
            <Header formAppear={contactAppear}/>
            <Routes>
                <Route index element={<Home formAppear={contactAppear}/>}/>
                <Route path='home' element={<Home formAppear={contactAppear}/>}/>
                <Route path="gallery" element={<Gallery />}/>
                {/* <Route path="mbarek/*" element={<SecureUpload />}/> */}
                {/* <Route path="mbarek/upload" element={<Upload />}/> */}

            </Routes>
            {/* <Outlet formAppear={contactAppear}/> */}
            <Lightbox flag={lightboxFlag} handleClick={contactDisppear}/>
        </div>
    );
}

export default App;
