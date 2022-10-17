import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import './docInputSection.scss';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

export const DocInputSection = (props) => {

  const token = useSelector(state => state.auth.tokenId);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(props.isNew ? "" : props.obj.description);

  const jsonField = (props.url === "moumoa") ? "mou_moa_id" : "mobility_id";

  const onFileUploadHandler = (event) => {
    // check whether event.target.files[0] works to load the correct file
    if ((event.target.files[0].size / 1024 / 1024) > 15) {
      alert("File size should not be more than 15mb");
    } else {
      setFile(event.target.files[0]);
    }
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
    data.append(jsonField, props.staffID);
    data.append("description", description);
    data.append("file", file);
    data.append("_method", "PUT");

    const jsonObject = {
      jsonField: props.staffID,
      "description": description,
      "file_name": file
    };

    // const newAttachments = (props.attachments).filter((element, i) => !(element.id === props.attachmentId));
    const newAttachments = (props.attachments).filter((element, i) => {
      console.log("element.id", element.id);
      console.log("props.attachmentId", props.attachmentId);
      return !(element.id === props.attachmentId);
    });

    console.log("newAttachments", newAttachments);

    fetch(`http://127.0.0.1:8000/api/updateAttachment/${props.url}/${props.attachmentId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(newAttachments, data.attachment);
        props.setIsEditing(false);
        props.setAttachments([data.attachment, ...newAttachments]);
      });
  };

  const onSaveHandler = () => {
    var data = new FormData();
    data.append(jsonField, props.staffID);
    data.append("description", description);
    data.append("file", file);

    const jsonObject = {
      jsonField: props.staffID,
      "description": description,
      "file_name": file
    };

    const newAttachments = (props.attachments).filter((element, i) => !(i === props.index));

    console.log(newAttachments);

    fetch(`http://127.0.0.1:8000/api/createAttachment/${props.url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("data:::", data);
        console.log(newAttachments, data.attachment);
        props.setAttachments([data.attachment, ...newAttachments]);
      });

  };

  return (
    <div className="section">
      <p className='section-title'>{props.sectionTitle}</p>
      <div className="form">
        <div key='description' className="formInput">
          <label>Description</label>
          <input type="text" name="description" value={description}
            onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="formInput">
          <label>Attachment (No more than 15MB)</label>
          <input className='custom-file-input' type="file" id="files" accept=".zip,.pdf"
            onChange={onFileUploadHandler}></input>
          {!props.isNew && (<label>file_name: {props.obj.file_name}</label>)}
          <label className='custom-file-input' for="files">{file && file.name}</label>
        </div>
        <Button className='section-btn' variant='contained' color='success'
          onClick={props.isNew === true ? onSaveHandler : onUpdateHandler} disabled={!file}>Save</Button>
        <Button className='section-btn' variant='outlined'
          onClick={props.isNew === true ? onNewCancelHandler : onCancelHandler}>Cancel</Button>
      </div>
    </div>
  );
};
