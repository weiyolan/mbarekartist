import React, {useState ,useContext} from "react";
import './upload.css';

import {Artshow, UploadForm} from '../../containers';
import { useEffect } from "react";

const Upload = () => {
    const [outdated, setOutdated] = useState(true); 

    return (
      <div className='upload_container container'>

        <UploadForm setOutdated={setOutdated}/>

        <Artshow delete={true} outdated={outdated} setOutdated={setOutdated}></Artshow>


      </div>
      )
}

export default Upload