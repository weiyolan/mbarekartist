import React, {useState, useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

import './makeCarousel.css';

const MakeCarousel = (props) => {
    const [allArt, setAllArt] = useState([]);
    const [index,setIndex] = useState(props.initialIndex);
    const [oldInitial,setOldInitial] = useState(-1);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };

    useEffect(()=>{
        if (oldInitial !== props.initialIndex) {
            setIndex(props.initialIndex);
            setOldInitial(props.initialIndex);
        }
    })

    useEffect(()=>{
        // async function getArt() {
        //     await axios.get("http://localhost:4000/api/").then(res => {
        //     let art = res.data.art;
        //     setAllArt(art);
        //     // console.log('In axios.get:')
        //     // props.setOutdated(false);

        //     }).catch((e)=>{
        //         console.log(e)
        //     });
        // }
        // getArt()
    },[]);
    // useEffect(()=>console.log((props.children)),[props])

    

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