import React, {useState, useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

import './makeCarousel.css';

const MakeCarousel = (props) => {
    const [allArt, setAllArt] = useState([]);
    const [index,setIndex] = useState(props.initialIndex);
    const [oldInitial,setOldInitial] = useState(-1);
    const [likeError, setLikeError] = useState(false);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };

    useEffect(()=>{
        if (oldInitial !== props.initialIndex) {
            setIndex(props.initialIndex);
            setOldInitial(props.initialIndex);
        }
    })

    // async function importAll(r) {
    //     let newArt = [];
    //     let info = await fetch('/.netlify/functions/getInfo').then(res=>res.json()).catch(resp=>{
    //         setLikeError(true);
    //         // console.log(resp.json())
    //         // console.log('error')
    //         return resp.json()
    //     });

    //     // console.log(info)
    //     // console.log(info.SyntaxError?true:false)

    //     for (const [index, item] of r.keys().entries()) {
    //         // TEST FOR NEW ART TO BE CREATED, NOT DOING ANYTHING FOR NOW: ONLY IN CASE OF NEW ART IN FUTURE
    //         // if (item.replace('./','').split('-')[0] !== 'art') {rename(r(item),item,index)}
    //         let artName =  item.replace('./','');
    //         console.log('ART IS ITERATED WITH LIKE STATUS')
    //         console.log(likeError)
    //         let artInfo = likeError?{fields:{likes:NaN}, id:NaN}:info.filter((art)=>{return art.fields.name === artName})[0];
            
    //         const art = {
    //             artImage : r(item),
    //             name : artName,
    //             likes : artInfo.fields.likes,
    //             id : artInfo.id
    //         };

    //         newArt.push(art);
    //     };
    //     return newArt
    // };

    // useEffect(()=>{
    //     const fetchArt = async () => {
    //         let array = require.context('../../images/work', false, /.*/);
            
    //         try {
    //             let response = await importAll(array);
    //             setAllArt(response);
    //             return response
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }

    //     fetchArt();

    // },[]);

    useEffect(()=>{
        setAllArt(props.art)
    })

    return (
        <div className='carousel__container' style={props.visibleStyle}>
            <span className="close" id="close" onClick={props.closeGallery}> &times; </span>
            <Carousel variant="light" className='carousel__art' activeIndex={index} onSelect={handleSelect}>
                {allArt.reverse().map((art,i)=>{
                    return (<Carousel.Item key={i}>
                                <div className='image__container'>
                                    <img src={art.artImage} alt={`${i}-th slide`}/>
                                </div>
                            </Carousel.Item>)})}
            </Carousel>
        </div>
    )
}

export default MakeCarousel