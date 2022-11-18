import React, {useState, useEffect} from 'react'
import {Artpiece, ArtpieceDel} from '../../components';
// import axios from 'axios';

import axios from 'axios';

import './artshow.css';

const Artshow = (props) => {
    const [allArt, setAllArt] = useState([]);

    useEffect(()=>{
        // console.log('props.art updated in artshow')
        setAllArt(props.art)
    },[props.art])

    return (
        <div>
        <div className='artshow__container'>
            {props.delete?
            <div className='gallery__delete'>
                {/* MAP FUNCTION FOR ALL IMAGES:*/}
                {allArt.reverse().map((art,i) => {
                return <ArtpieceDel setOutdated={props.setOutdated} src={art.artImage} likes={art.likes} artID={art.id} key={i}/>
                })}
            </div>:
            <div className='gallery'>
                {/* MAP FUNCTION FOR ALL IMAGES:*/}
                {allArt.reverse().map((art,i) => {
                return <Artpiece likeError={props.likeError} handleClick={props.handleArtClick} src={art.artImage} likes={art.likes} artID={art.id} key={i} myKey={i}/>
                })}
            </div>}
        </div>

    </div>
    )
}

export default Artshow