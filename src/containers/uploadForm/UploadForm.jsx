import React, {useState,useEffect,useContext} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './uploadForm.css';
import Compressor from 'compressorjs';
import {MdAddPhotoAlternate} from 'react-icons/md';
import {AuthContext} from '../../components';
import {LoadingContainer} from '../../containers';

const UploadForm = (props) => {

    const { token } = useContext(AuthContext);

    const [artImages,setArtImages] = useState([]);

    const [compressed, setCompressed] = useState(false);
    const [compressStatus, setCompressStatus] = useState(0);

    const [submitted,setSubmitted] = useState(false);
    const [uploaded,setUploaded] = useState(false);
    const [loading, setLoading] = useState(false);

    const [lightboxStyle, setLightboxStyle] = useState({visibility:'visible', opacity:1});
    // const [lightboxFlag, setLightboxFlag] = useState(false);

    const setLightbox = (styleFlag) => {
        setLightboxStyle(styleFlag?{visibility:'visible',opacity:1}:{visibility:'hidden', opacity:0})
        // setLightboxStyle({visibility:'hidden',opacity:0})
    }; 

    const handleFileChange = (e) => {
        setCompressed(false);
        setUploaded(false);
        setSubmitted(false);
        setCompressStatus(0);
        setLightbox(true);

        setLoading(true);
        let files = Object.keys(e.target.files);
        let newImages = files.map(file => {return e.target.files[file]});
        let compressedImages = [];

        async function compressImages(images) {
            
            for (const image of images) {
                await new Promise((resolve)=>{
                    new Compressor(image, {
                        quality: 0.8,
                        width:1080,
                        success: (result) => {
                            compressedImages.push(result);
                            setCompressStatus(Math.floor(100*compressedImages.length/newImages.length));
                            resolve();
                        }
                    });
                });
            } 
            // console.log('Compressed!')
            setArtImages(compressedImages);
            setLoading(false);
            setCompressed(true);
        }
        // console.log('Start Compressing')
        compressImages(newImages)
        // newImages = compressedImages = artImage = [File, File, File, File, File]
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmitted(true);

        var formData = new FormData();
        artImages.forEach((artImage)=>{
            formData.append('artImage', artImage);  
            // formData = {... , artImage: File, artImage: File, artImage: File, ...}
        });

        async function postArt() {
            axios.post("http://localhost:4000/api/multiple", formData, {
            headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
            }).then(res => {
                setLoading(false);
                if (res.data.Art.length !== 0 ) {
                    // setCompressStatus(false);
                    setUploaded(true);
                    props.setOutdated(true);
                    console.log('Success!');
                    console.log(res);
                }
            }).catch(e=>{
                setLoading(false);
                setUploaded(false);
                alert('❌Error! Try logging in again. \n Message: ' + e)
                console.log('Error!');
                console.log(e);
            });
        }
        postArt();
    }

    return (
        <div className="form__container">
            <form onSubmit={handleSubmit}>
                <label htmlFor='newUpload'><h1>Upload New Photo's<br/><MdAddPhotoAlternate/></h1></label><br/>
                <input type="file" id='newUpload' onChange={handleFileChange} multiple/> 
                {compressed && !loading && 
                <div>
                    {!submitted && !uploaded && <Button className='upload__button' variant='primary' type="Submit">
                        YELLA!
                    </Button>}
                </div>}
            </form>
            
            <LoadingContainer 
                setLightbox={setLightbox}
                lightboxStyle={lightboxStyle} 
                loading={loading} 
                uploaded={uploaded} 
                submitted={submitted} 
                compressed={compressed} 
                compressStatus={compressStatus} />

        </div>
    )
}

export default UploadForm