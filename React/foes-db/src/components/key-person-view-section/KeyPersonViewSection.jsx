import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import './keyPersonViewSection.scss'

const KeyPersonViewSection = (props) => {

  const token = useSelector(state => state.auth.tokenId);

  const onEditHandler = () => {
    props.setIsEditing(true);
  };

  const onDeleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this element?") == true) {
      fetch(`http://127.0.0.1:8000/api/deleteKeyContactPerson/${props.obj.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newKeyPersons = (props.keyPersons).filter((element, i) => !(i === props.index));
      props.setKeyPersons(newKeyPersons);
    }
  };

  return (
    <div className="section">
      <div className="form">
        <div className="formInput">
          <label>Name: {props.obj.name}</label>
        </div>
        <div className="formInput">
          <label>Email: {props.obj.email}</label>
        </div>
        <div className="formInput">
          <label>Institution: {props.obj.institution}</label>
        </div>
        <Button className='section-btn' variant="contained"  onClick={onEditHandler}>edit</Button>
        <Button className='section-btn' variant="contained" color="error" onClick={onDeleteHandler}>delete</Button>
      </div>
    </div>
  );
};

export default KeyPersonViewSection;
