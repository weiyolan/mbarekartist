import React, {useState} from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import {BsFillCheckSquareFill} from 'react-icons/bs';
import {ImCross} from 'react-icons/im';

import './loadingContainer.css';

const LoadingContainer = ({setLightbox,lightboxStyle,loading,compressed,uploaded,submitted, compressStatus}) => {
    const handleClick = () => {
        setLightbox(false);
    }

    return (
            <div>
                {loading && 
                <div className='loading__container'>
                    <div className='loading__message'>
                        {compressed?
                            <h1>Part 2: Loading...</h1>:
                            <h1>Part 1: Loading...</h1>}
                        {compressed?
                            <Button variant="dark" disabled>
                                <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                />
                                <span className="visually-hidden">Loading...</span>
                            </Button>:
                            <ProgressBar now={compressStatus} label={`${compressStatus}%`}/>
                        }
                    </div>
                </div>}

                {submitted && !loading && uploaded &&
                    <div className='loading__container' style={lightboxStyle} onClick={handleClick}>
                        <div className='loading__message'>
                                {/* <span className="close" id="close" onClick={handleClick}>&times;</span> */}
                                <h1>100% Success!!</h1>
                                <h1><BsFillCheckSquareFill/></h1>
                        </div>
                    </div>
                    
                }

                {submitted && !loading && !uploaded &&
                    <div className='loading__container' style={lightboxStyle} onClick={handleClick}>
                        <div className='loading__message'>
                            {/* <span className="close" id="close" onClick={handleClick}>&times;</span> */}
                            <h1>ERROR</h1>
                            <h1><ImCross/></h1>

                    </div>
                </div>
                }
            </div>
    )
}

export default LoadingContainer