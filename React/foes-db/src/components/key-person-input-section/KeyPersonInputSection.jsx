import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './keyPersonInputSection.scss'

const KeyPersonInputSection = (props) => {

  const token = useSelector(state => state.auth.tokenId)

  const [institution, setInstitution] = useState(props.isNew ? "" : props.obj.institution);
  const [name, setName] = useState(props.isNew ? "" : props.obj.name);
  const [email, setEmail] = useState(props.isNew ? "" : props.obj.email);

  const onCancelHandler = () => {
    props.setIsEditing(false);
  };

  const onNewCancelHandler = () => {
    const newKeyPersons = (props.keyPersons).filter((element, i) => !(i === props.index));
    props.setKeyPersons(newKeyPersons);
  };

  const onUpdateHandler = (event) => {
    // TODO: Find a way to use form-data on fetch request
    // staff_id: props.staffID
    // type: typeInput.current.value
    // description: description
    // file: file
    event.preventDefault();
    const jsonObject = {
      "name": name,
      "email": email,
      "institution": institution
    };

    fetch(`http://127.0.0.1:8000/api/updateKeyContactPerson/${props.obj.id}`, {
      method: 'PUT',
      body: JSON.stringify(jsonObject),
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
      .then(response => {
        const newArray = (props.keyPersons).filter((element, i) => !(i === props.index));
        props.setKeyPersons([...newArray, jsonObject]);
      });
  };

  const onSaveHandler = (event) => {
    event.preventDefault();
    const jsonObject = {
      "name": name,
      "email": email,
      "institution": institution,
      "mou_moa_id": props.mouID
    };

    const newArray = (props.keyPersons).filter((element, i) => !(i === props.index));

    fetch('http://127.0.0.1:8000/api/createKeyContactPerson', {
      method: 'POST',
      body: JSON.stringify(jsonObject),
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      props.setKeyPersons([data.KeyContactPerson, ...newArray]);
    });
      // .then(response => {
      //   const newArray = (props.keyPersons).filter((element, i) => !(i === props.index));
      //   props.setKeyPersons([...newArray, jsonObject]);
      // });
  };


  return (
    <div className="section">
      <p className='section-title'>{props.sectionTitle}</p>
      <div className="form">
        <div key='description' className="formInput" >
          <label>name</label>
          <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div key='institution' className="formInput" >
          <label>institution</label>
          <input type="text" name="institution" value={institution} onChange={e => setInstitution(e.target.value)} />
        </div>
        <div key='email' className="formInput" >
          <label>email</label>
          <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <Button className='section-btn' variant="contained" color="success" onClick={props.isNew === true ? onSaveHandler : onUpdateHandler}>Save</Button>
        <Button className='section-btn' variant="outlined" onClick={props.isNew === true ? onNewCancelHandler : onCancelHandler}>Cancel</Button>
      </div>
    </div>
  );
};

export default KeyPersonInputSection;