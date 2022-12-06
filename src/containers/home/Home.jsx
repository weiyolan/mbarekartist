import React from 'react';
import Button from 'react-bootstrap/Button';
import './home.css';
import {IoLocationSharp} from 'react-icons/io5';
import {Service} from '../../components';
import {service1,service2,service3,service4} from './imports';
import {Link} from 'react-router-dom';

const Home = (props) => {
  
    return (
        <div className='home__container'>
                <div className='home__contents-right'>
                    <div className='buttons'> 
                        <Link to="/gallery"><Button className='home__button' variant='dark'>View Collection</Button></Link>
                        <Button onClick={props.formAppear} className='home__button' variant='dark'>Contact Me</Button>
                    </div>
                    <div className='home__contents__title'>
                        
                        <div className='home__title'>
                            <h1>I am Mbarek Ezzaim</h1>
                            <h2>Your Berber Style wood artist and sculpturer with 20 years of experience.</h2>
                            <h3 className="home__title__location"><IoLocationSharp/> Imsouane, Agadir, Morocco</h3>
                        </div>
                    </div>
                    <div className='home__services'>
                        <Service alt="first service" title="I craft your idea." src={service1}/>
                        <Service alt="second service" title="Personalise your product." src={service2}/>
                        <Service alt="third service" title="Interior and Exterior." src={service3}/>
                        <Service alt="fourth service" title="Lamps and Decoration." src={service4}/>
                    </div>
                </div>  
        </div>
    )
}

export default Home