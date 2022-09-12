import { Button } from '@mui/material';
import React, { useRef, useState } from 'react'
import './addSingleColumn.scss';

const AddSingleColumn = (props) => {

  const [open, isOpen] = useState(false);
  const inputColumnName = useRef('');

  const onOpenHandler = () => {
    isOpen(true);
  };

  const onConfirmHandler = () => {
    isOpen(false);
    console.log('inputColumnName: ', inputColumnName.current.value);
    props.onAddColumnHandler(inputColumnName.current.value);
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
    <div className="addSingleColumn">
      {open && formInput}
      {!open && initialComponent}
    </div>
  )
}

export default AddSingleColumn