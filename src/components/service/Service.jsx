import React from 'react';
import './service.css';

const Service = (props) => {

  return (
    <div className="service__container">
        <div className="service__img-container">
            <img alt={props.alt} src={props.src}/>
        </div>
        <h1>{props.title}</h1>
    </div>
  )
}

export default Service