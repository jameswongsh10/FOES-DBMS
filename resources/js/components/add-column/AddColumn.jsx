import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { tableActions } from '../../store/table-slice';
import './addColumn.scss';
import axios from "axios";

const AddColumn = () => {
  const dispatch = useDispatch();

  const [open, isOpen] = useState(false);
  const inputColumnName = useRef('');

  const onOpenHandler = () => {
    isOpen(true);
  };

  const onConfirmHandler = () => {
    isOpen(false);
    dispatch(tableActions.addCustomColumn(inputColumnName.current.value));
      let url = '/addAdminColumn';

      axios.post(url, JSON.stringify(inputColumnName.current.value))
          .then(response => {
              console.log(JSON.stringify(response.data));
          })
          .catch(error => {
              console.log("ERROR:: ", error.response.data);
          })
  }

  const initialComponent = (
    <Button onClick={onOpenHandler}>
      <h1>+</h1>
    </Button>
  )

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
