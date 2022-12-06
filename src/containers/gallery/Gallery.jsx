import React,{useState} from 'react'
import { useEffect } from 'react';
import {Artshow, MakeCarousel} from '../../containers';
import './gallery.css';

const Gallery = () => {
    const [funnyFlag, setFunnyFlag] = useState(false);
    const [style,setStyle] = useState({display:'none'});
    const [index,setIndex] = useState(0);
    const [outdated,setOutdated] = useState(true);
    const [loading,setLoading] = useState(true)

    const [allArt, setAllArt] = useState([]);
    const [artDetected,setArtDetected] = useState(false);
    // const [allInfo,setAllInfo] = useState([]);
    const [likeError, setLikeError] = useState(false);
    
    const openGallery = (i) => {
        console.log('gallery opened by artclick from art: ' + i) 
        setIndex(i);
        setFunnyFlag(true);
        setStyle({display:'flex'})
    }

    const closeGallery = () => {
        console.log('clicked');
        setFunnyFlag(false);
        setStyle({display:'none'})
    }
    
    // function rename(loc, oldname, index) {
    //     let artName = `art-${1000000+index}`;
    //     let newLocation = loc.split('/');
    //     newLocation.pop().push(artName);
    //     newLocation = newLocation.join('/');
    //     // console.log(artName);
    //     // console.log(newLocation);
    // }
    const getInfo = async () => {
        try {
            let info = await fetch('/.netlify/functions/getInfo')
                if (info.ok) {
                    setLikeError(true);
                    return info.json()
                } else {
                    return false
                }

        } catch (e) {
                console.log(e)
            }
    };

    async function registerArt(newArt) {
        // axios.put(`http://localhost:4000/api/like/${props.artID}`).then((res)=>{
        // like(props.artID)
        fetch('/.netlify/functions/registerArt', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({newArt:newArt})
        }).then((res)=>{ 
            if (res.ok) {   
                console.log('New artpieces detected and registered!');
                console.log(res)
                setArtDetected(old=>!old)
                return res
            }
        }).catch(e=>{
            console.log('New artpieces detected but failed to register!')
            console.log(e)
            return e
        })
    }
   
    async function importAll(r, info) {
        let newArt = [];
        let artList = []; 
        // console.log(info)
        // console.log(info.SyntaxError?true:false)

        for (const [index, item] of r.keys().entries()) {
            // TEST FOR NEW ART TO BE CREATED, NOT DOING ANYTHING FOR NOW: ONLY IN CASE OF NEW ART IN FUTURE
            // if (item.replace('./','').split('-')[0] !== 'art') {rename(r(item),item,index)}
            let artName =  item.replace('./','');
            // console.log('ART IS ITERATED WITH LIKE STATUS')
            // console.log(likeError)
            let artInfo = info ? info.filter((art)=>{return art.fields.name === artName})[0]:{fields:{likes:NaN}, id:NaN};
            
            if (artInfo===undefined) {
                // Prepare to create new art in spreadsheet database
                newArt.push(artName);
            } else {
                const art = {
                    artImage : r(item),
                    name : artName,
                    likes : artInfo.fields.likes,
                    id : artInfo.id
                };

                artList.push(art);
            }
        };

        if (newArt.length > 0) {
            await registerArt(newArt);
            // console.log('ARTLIST RESPONSE');
            // console.log(response);
        }
        
        return artList
    };

    useEffect(()=>{

        const fetchArt = async () => {
            let locations = require.context('../../images/work', false, /.*/);
            
            try {
                let info = await getInfo();
                // console.log('awaited info:')
                // console.log(info)
                let art = await importAll(locations, info);
                setAllArt(art);
                setLoading(false);
                return art
            } catch (err) {
                console.log(err)
            }
        }
        // console.log('FETCHING ART WITH LIKESTATUS: ')
        // console.log(likeError)
        fetchArt();

    },[artDetected]);


    return (
        <div className="gallery__container">
            <div className='gallery__title'>
                <h1 >Welcome to my wood art.</h1>
                <h2 >Have a look at my creations and by inspired.</h2>
            </div>

            <div className="wave-line__container"><div className="wave-line"></div></div>
            
            <Artshow likeError={likeError} art={allArt} loading={loading} delete={false} outdated={outdated} setOutdated={setOutdated} handleArtClick={openGallery}/>
            <MakeCarousel art={allArt} initialIndex={index} visibleStyle={style} closeGallery={closeGallery}/>
            
                
        </div>
    )
}

export default Gallery