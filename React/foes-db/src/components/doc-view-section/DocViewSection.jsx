import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import DownloadIcon from '@mui/icons-material/Download';
import URL from '../../store/url';

const DocViewSection = (props) => {

  const token = useSelector(state => state.auth.tokenId);

  const onEditHandler = () => {
    props.setIsEditing(true);
  };

  const onDeleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this element?") == true) {
      fetch(`${URL}/api/deleteAttachment/${props.url}/${props.obj.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newAttachments = (props.attachments).filter((element, i) => !(element.id === props.attachmentId));
      props.setAttachments(newAttachments);
    }
  };

  return (
    <div className="section">
      <div className="form">
        <div className="formInput">
          <label>Description: {props.obj.description}</label>
        </div>
        <div className="formInput">
          <label>file_name: {props.obj.file_name}</label>
        </div>
        <a href={`${URL}/api/downloadAttachment/${props.url}/${props.attachmentId}`} download='myFile'>
          <Button variant="contained" color='success' endIcon={<DownloadIcon />} onClick={() => { (<a href={`${URL}/api/downloadAttachment/${props.url}/${props.attachmentId}`} download='myFile'>Download</a>); }}>
            Download
          </Button>
        </a>
        <Button className='section-btn' variant='contained' onClick={onEditHandler}>edit</Button>
        <Button className='section-btn' variant='outlined' color='error' onClick={onDeleteHandler}>delete</Button>
      </div>
    </div>
  )
}

export default DocViewSection