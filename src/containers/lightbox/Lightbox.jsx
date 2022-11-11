import React from 'react';
import { useEffect,useState } from 'react';
import './lightbox.css';
import {BsFillTelephoneOutboundFill,BsWhatsapp} from 'react-icons/bs';
import whatsapp from '../../images/whatsapp/WhatsAppButtonGreenLarge.svg';

const Lightbox = ({handleClick,flag}) => {
    let [lightboxStyle, setLightboxStyle] = useState({visibility:'hidden', opacity:0});
    
    const toggleStyle = (styleFlag) => {
        setLightboxStyle(styleFlag?{visibility:'visible',opacity:1}:{visibility:'hidden', opacity:0})
    };  

    useEffect(()=>{
        toggleStyle(flag);
    }, [flag]);

    return (
        <div className="light-box" id="light-box" style={lightboxStyle}>
            <div className="contact__container">
                <span className="close" id="close" onClick={handleClick}>&times;</span>
                <div className="wave-line__container"><div className="wave-line"></div></div>
                <div className='light-box__contents'>
                    <h1>Contact</h1>
                    <p>Call me to get an offer for your project idea.</p>
                    <ul>
                        <li><a href="tel:+212621833057"><BsFillTelephoneOutboundFill/> +212 6 21 83 30 57</a></li>
                        <li><a aria-label="Chat on WhatsApp" href="https://wa.me/+212621833057?text=Hi%20Mbarek%2C%20I%20have%20a%20Berber%20Art%20project%20for%20you."> <img alt="Chat on WhatsApp" src={whatsapp} /></a></li>
                    </ul>
                </div>
                <div className="wave-line__container"><div className="wave-line"></div></div>
            </div>
        </div>
    )
}

export default Lightbox