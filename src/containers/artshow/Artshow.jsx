import React, {useState, useEffect} from 'react'
import {Artpiece, ArtpieceDel} from '../../components';
// import axios from 'axios';

import axios from 'axios';

import './artshow.css';

const Artshow = (props) => {
    const [allArt, setAllArt] = useState([]);

    // useEffect(()=>{
    //     async function getArt() {
    //         await axios.get("http://localhost:4000/api/").then(res => {
    //         let art = res.data.art;
    //         setAllArt(art);
    //         props.setOutdated(false);
    //         // console.log('In axios.get:')
    //         // props.setOutdated(false);
    //         }).catch((e)=>{
    //             console.log(e)
    //         });
    //     }
    //     if (props.outdated) {
    //         getArt()
    //     }
    // });

    useEffect(()=>{
        const fetchArt = async () => {

            let array = require.context('../../images/work', false, /.*/).keys();

            try {
                let response = await fetch('/.netlify/functions/getArt', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(array)
                    });
                // console.log(response)
                // console.log(JSON.parse(response))
                // let response = await getArt();
                // setAllArt(response);
                // console.log(art)
                return response
            } catch (err) {
                console.log(err)
            }
        }

        // console.log('fetching art?')
        fetchArt()
    },[]);

    useEffect(()=>{
        // console.log(allArt);
    },[allArt])

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
                return <Artpiece handleClick={props.handleArtClick} src={art.artImage} likes={art.likes} artID={art.id} key={i} myKey={i}/>
                })}
            </div>}
        </div>

    </div>
    )
}

export default Artshow