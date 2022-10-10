import React from 'react';

const FileViewSection = (props) => {

  const onEditHandler = () => {
    props.setIsEditing(true);
  }

  const onDeleteHandler = () => {
    fetch(`http://127.0.0.1:8000/api/deleteAttachment/${props.obj.id}`, {
      method: 'DELETE'
    })
    const newAttachments = (props.attachments).filter((element, i) => !(i === props.index));
    props.setAttachments(newAttachments);
  }

  return (
    <div className="section">
      <div className="form">
        <div className="formInput">
          <label>Type: {props.obj.type}</label>
        </div>
        <div className="formInput">
          <label>Description: {props.obj.description}</label>
        </div>
        <div className="formInput">
          <label>file_name: {props.obj.file_name}</label>
        </div>
        <button onClick={onEditHandler}>edit</button>
        <button onClick={onDeleteHandler}>delete</button>
      </div>
    </div>
  );
};

export default FileViewSection;