import React, { useCallback, useState } from "react";
import './upload.css';
import cuid from "cuid";
import {Dropzone} from "..";
import {ImageGrid} from "..";

const Upload = () => {

  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      
      const reader = new FileReader();

      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          { id: cuid(), src: e.target.result },
        ]);
      };
      reader.readAsDataURL(file);
      
      return file;
    });
  }, []);


  return (
    <div className='container'>
      <h1 className="text-center">Drag and Drop Test</h1>
      <Dropzone onDrop={onDrop} accept={"image/*"} />
      <ImageGrid images={images} />
    </div>
    )
}

// export default Upload