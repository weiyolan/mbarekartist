import React, {useState, useEffect} from 'react'
import {Artpiece, ArtpieceDel,ArtpieceLoading} from '../../components';
// import axios from 'axios';

// import axios from 'axios';

import './artshow.css';

const Artshow = (props) => {
    const [allArt, setAllArt] = useState([]);
    // const [reverseArt,setReverseArt] = useState([]);
    // const [reversed,setReversed] = useState(false);

    useEffect(()=>{
        console.log('props.art updated in artshow')
        setAllArt([...props.art].reverse())
    },[props.art])

    return (
        
        <div className='artshow__container'>
            {props.delete?
            <div className='gallery__delete'>
                {allArt.map((art,i) => {
                return <ArtpieceDel setOutdated={props.setOutdated} src={art.artImage} likes={art.likes} artID={art.id} key={i}/>
                })}
            </div>:    
            <div className='gallery'>
                {props.loading?

                [...Array(20)].map(()=>{
                    return <ArtpieceLoading/>}):

                allArt.map((art,i) => {
                    return <Artpiece loading={props.loading} likeError={props.likeError} handleClick={props.handleArtClick} src={art.artImage} likes={art.likes} artID={art.id} key={i} myKey={i}/>
                })}
            </div>}
        </div>
    )
}

export default Artshow