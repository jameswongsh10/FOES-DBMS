import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { tableActions } from '../../store/table-slice';
import './addNew.scss';
import { useNavigate } from 'react-router-dom';
import AddColumn from '../../components/add-column/AddColumn';
import { Button } from '@mui/material';

const AddNew = () => {

  const navigate = useNavigate();
  const viewCollection = useSelector(state => state.table.view);
  // const columnsArr = useSelector(state => state.table.columns);
  const columnsArr = useSelector(state => state.table.customColumns);

  // let inputArr = columnsArr.concat(customColumnsArr); // may add additional column here
  let inputArr = columnsArr;
  const listRef = useRef([]);
  let newObj = {};

  const submitHandler = (event) => {
    event.preventDefault();
    listRef.current.forEach(el => {
      if (el.value) {
        newObj[`${el.name}`] = el.value;
      }
    })
    fetch(`https://foes-3edf9-default-rtdb.asia-southeast1.firebasedatabase.app/database/${viewCollection}.json`, {
      method: 'POST',
      body: JSON.stringify(newObj)
    })
    navigate('/');
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {/* <div className="top"> */}
        <div className="title">
          <p>{viewCollection}</p>
        </div>
        {/* </div> */}
        <div className="bottom">
          <form onSubmit={submitHandler}>
            {inputArr.map((label, i) => {
              return (
                <div key={label} className="formInput" >
                  <label>{label}</label>
                  <input type="text" name={label} ref={(ref) => (listRef.current[i] = ref)} />
                </div>
              );
            })}
            <Button type='submit'>Send</Button>
          </form>
        </div>
        <div className="addColumnBox">
            <p className='title'>Add Column</p>
            <AddColumn />
        </div>
      </div>
    </div>
  );
};

export default AddNew;