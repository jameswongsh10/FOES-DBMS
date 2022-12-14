import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { tableActions } from '../../store/table-slice';
import './addColumn.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';
import URL from '../../store/url';

const AddColumn = (props) => {
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.tokenId);

  const [open, isOpen] = useState(false);
  const inputColumnName = useRef('');

  const onOpenHandler = () => {
    isOpen(true);
  };

  const onConfirmHandler = () => {


    isOpen(false);

    axios.post(`${URL}/api/${props.apiEndPoint}`, JSON.stringify(String(inputColumnName.current.value)), {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'text/plain'
      }
    })
      .then(response => {
        if (response.status == 201) {
          props.onCustomColumnAddHandler();
          return response;
        }
        return Promise.reject(response);
      })
      .catch(response => {
        // console.log(response);
        // console.log(response.response.data.message);
        alert(response.response.data.message)
        // response.then(response => alert(response.response.data.message));
      });

  };

  const initialComponent = (
    <Button onClick={onOpenHandler}>
      <h1>+</h1>
    </Button>
  );

  const formInput = (
    <div className="columnForm">
      <input type='text' className='columnFormInput' placeholder="Column Name" ref={inputColumnName}></input>
      <Button size="small" variant="outlined" id='confirmBtn' onClick={onConfirmHandler}> Confirm </Button>
    </div>
  );

  return (
    <div className="addColumn">
      {open && formInput}
      {!open && initialComponent}
    </div>
  );
};

export default AddColumn;
