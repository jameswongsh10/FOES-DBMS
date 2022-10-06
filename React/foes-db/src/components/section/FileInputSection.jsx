import React, { useState } from 'react';
import './fileInputSection.scss';

const FileInputSection = (props) => {

  const [file, setFile] = useState(null);

  console.log(file);

  const onFileUploadHandler = (event) => {
    // check whether event.target.files[0] works to load the correct file
    setFile(event.target.files[0]);
  }

  return (
    <div className="section">
      <p className='section-title'>{props.sectionTitle}</p>
      <div className="form">
        <div key='description' className="formInput" >
          <label>Description</label>
          <input type="text" name="description" />
        </div>
        <div className="formInput">
          <label>Attachment</label>
          <input className='custom-file-input' type="file" onChange={onFileUploadHandler}></input>
        </div>
      </div>
    </div>
  );
};

export default FileInputSection;