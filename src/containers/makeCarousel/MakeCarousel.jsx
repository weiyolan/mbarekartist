import React, {useState, useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

import './makeCarousel.css';

const MakeCarousel = (props) => {
    const [allArt, setAllArt] = useState([]);
    const [index, setIndex] = useState(props.initialIndex);
    const [oldInitial,setOldInitial] = useState(-1);
    // const [likeError, setLikeError] = useState(false);

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
        setAllArt([...props.art].reverse())
    },[props.art])

    return (
        <div className='carousel__container' style={props.visibleStyle}>
            <span className="close" id="close" onClick={props.closeGallery}> &times; </span>
            <Carousel variant="light" className='carousel__art' activeIndex={index} onSelect={handleSelect}>
                {allArt.map((art,i)=>{
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