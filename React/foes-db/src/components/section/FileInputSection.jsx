import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import './fileInputSection.scss';
import { useSelector } from 'react-redux';

const FileInputSection = (props) => {

  const token = useSelector(state => state.auth.tokenId);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(props.isNew ? "" : props.obj.description);
  const typeInput = useRef(null);

  const onFileUploadHandler = (event) => {
    // check whether event.target.files[0] works to load the correct file
    setFile(event.target.files[0]);
  };

  const onCancelHandler = () => {
    props.setIsEditing(false);
  };

  const onNewCancelHandler = () => {
    const newAttachments = (props.attachments).filter((element, i) => !(i === props.index));
    props.setAttachments(newAttachments);
  };

  const onUpdateHandler = () => {

    var data = new FormData();
    data.append("staff_id", props.staffID);
    data.append("type", typeInput.current.value);
    data.append("description", description);
    data.append("file", file);
    data.append("_method", "PUT");

    const jsonObject = {
      "staff_id": props.staffID,
      "type": typeInput.current.value,
      "description": description,
      "file_name": file
    };

    const newAttachments = (props.attachments).filter((element, i) => !(element.id === props.attachmentId));

    fetch(`http://127.0.0.1:8000/api/updateAttachment/${props.attachmentId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        // console.log(newAttachments, data.attachment);
        // props.setAttachments(newAttachments);
        // return data;
        props.updateAttachmentsHTTP();
      })
  };

  const onSaveHandler = () => {
    // TODO: Find a way to use form-data on fetch request
    var data = new FormData();
    data.append("staff_id", props.staffID);
    data.append("type", typeInput.current.value);
    data.append("description", description);
    data.append("file", file);

    const jsonObject = {
      "staff_id": props.staffID,
      "type": typeInput.current.value,
      "description": description,
      "file_name": file
    };

    const newAttachments = (props.attachments).filter((element, i) => !(i === props.index));

    console.log(newAttachments);

    fetch(`http://127.0.0.1:8000/api/createAttachment`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    })
      .then(response => {
        return response.json();
        // props.setAttachments(newAttachments)
        // props.setAttachments([...newAttachments, jsonObject])
      })
      .then(data => {
        // console.log(data);
        // console.log(data.attachment);
        // console.log(props.attachments);
        console.log(newAttachments, data.attachment);
        props.setAttachments([data.attachment ,...newAttachments]);
      });

  };

  return (
    <div className="section">
      <p className='section-title'>{props.sectionTitle}</p>
      <div className="form">
        <div className="formInput">
          <label>Type</label>
          <select name="type" id="type" defaultValue={!props.isNew && props.obj.type === "Professional Qualification" ? "Professional Qualification" : "Professional Membership"} ref={typeInput}>
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