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

    function rename(loc, oldname, index) {
        let artName = `art-${1000000+index}`;
        let newLocation = loc.split('/');
        newLocation.pop().push(artName);
        newLocation = newLocation.join('/');
        // console.log(artName);
        // console.log(newLocation);
    }

    async function importAll(r) {
        let newArt = [];
        let info = await fetch('/.netlify/functions/getInfo').then(res=>res.json())
        console.log(info)
        // let info = await axios.get(`https://api.airtable.com/v0/${TBL}/art`, {
        //     headers: {Authorization: `Bearer ${KEY}`}}).then((resp)=>{
        //     // console.log(resp.data.records)
        //     console.log('===========================')
        //     return resp.data.records})

        for (const [index, item] of r.keys().entries()) {
            // TEST FOR NEW ART TO BE CREATED
            // NOT DOING ANYTHING FOR NOW: ONLY IN CASE OF NEW ART IN FUTURE
            // if (item.replace('./','').split('-')[0] !== 'art') {rename(r(item),item,index)}
            let artName =  item.replace('./','');
            let artInfo = info.filter((art)=>{return art.fields.name === artName})[0];
            
            const art = {
                artImage : r(item),
                name : artName,
                likes : artInfo.fields.likes,
                id : artInfo.id
            };

            // console.log('ART')
            // console.log(art)
            newArt.push(art);
        };
        // console.log(newArt)
        return newArt
    };

    useEffect(()=>{
        const fetchArt = async () => {

            let array = require.context('../../images/work', false, /.*/);
            // console.log(array)

            try {
                let response = await importAll(array);
                setAllArt(response);
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