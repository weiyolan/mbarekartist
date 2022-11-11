import React,{useState} from 'react'
import { useEffect } from 'react';
import {Artshow, MakeCarousel} from '../../containers';
import './gallery.css';

const Gallery = () => {
    const [funnyFlag, setFunnyFlag] = useState(false);
    const [style,setStyle] = useState({display:'none'});
    const [index,setIndex] = useState(0);
    const [outdated,setOutdated] = useState(true);
    
    const openGallery = (i) => {
        console.log('gallery opened by artclick from art: ' + i) 
        setIndex(i);
        setFunnyFlag(true);
        setStyle({display:'flex'})
    }

    useEffect(()=>{
        console.log('styleFlag updated: ' + funnyFlag)
    })

    const closeGallery = () => {
        console.log('clicked');
        setFunnyFlag(false);
        setStyle({display:'none'})
    }

    // const visibleStyle = (flag) => {
    //     if (flag) {
    //         console.log('Used positive')
    //         return {visibility:'visible', opacity:1};
    //     } else {
    //         console.log('Used negative')
    //         return {visibility:'hidden', opacity:0};
    //     };
    // }

    // style={styleFlag?{visibility:'visible', opacity:1}:{visibility:'hidden', opacity:0}}

   // useEffect(()=>{
    //     setStyleFlag(props.flag);
    // }, [props.flag]);  

    return (
        <div className="gallery__container">
            <h1 >Welcome to my wood art.</h1>
            <h2 >Have a look at my creations and by inspired.</h2>

            <div className="wave-line__container"><div className="wave-line"></div></div>
            
            <Artshow delete={false} outdated={outdated} setOutdated={setOutdated} handleArtClick={openGallery}/>
            <MakeCarousel initialIndex={index} visibleStyle={style} closeGallery={closeGallery}/>
            
                
        </div>
    )
}

export default Gallery