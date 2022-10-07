import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import './fileInputSection.scss';

const FileInputSection = (props) => {

  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(props.isNew ? "" : props.obj.description);
  const typeInput = useRef(null);

  const onFileUploadHandler = (event) => {
    // check whether event.target.files[0] works to load the correct file
    setFile(event.target.files[0]);
  };

  const onCancelHandler = () => {
    props.setIsEditing(false);
  }

  const onNewCancelHandler = () => {
    const newAttachments = (props.attachments).filter((element, i) => !(i === props.index));
    props.setAttachments(newAttachments);
  }

  const onUpdateHandler = () => {
    // TODO: Find a way to use form-data on fetch request
    // staff_id: props.staffID
    // type: typeInput.current.value
    // description: description
    // file: file
  }

  const onSaveHandler = () => {
    // TODO: Find a way to use form-data on fetch request
    // staff_id: props.staffID
    // type: typeInput.current.value
    // description: description
    // file: file
  }

  return (
    <div className="section">
      <p className='section-title'>{props.sectionTitle}</p>
      <div className="form">
        <div className="formInput">
          <label>Type</label>
          <select name="type" id="type" defaultValue={!props.isNew && props.obj.type === "Professional Qualification" ? "Professional Qualification" : "Professional Membership"}>
            <option value="Professional Qualification">Professional Qualification</option>
            <option value="Professional Membership">Professional Membership</option>
          </select>
        </div>
        <div key='description' className="formInput" >
          <label>Description</label>
          <input type="text" name="description" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="formInput">
          <label>Attachment</label>
          <input className='custom-file-input' type="file" onChange={onFileUploadHandler}></input>
        </div>
        <button onClick={props.isNew === true ? onSaveHandler : onUpdateHandler}>Save</button>
        <button onClick={props.isNew === true ? onNewCancelHandler : onCancelHandler}>Cancel</button>
      </div>
    </div>
  );
};

export default FileInputSection;