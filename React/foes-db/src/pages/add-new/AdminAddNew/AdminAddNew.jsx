import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';

import './adminAddNew.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import AddColumn from '../../../components/add-column/AddColumn';

const AdminAddNew = () => {
  const navigate = useNavigate();

  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const miriIdInput = useRef(null);
  const perthIdInput = useRef(null);
  const emailAddressInput = useRef(null);
  const passwordInput = useRef(null);
  const remarkInput = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(firstNameInput.current.value);
    console.log(lastNameInput.current.value);
    console.log(miriIdInput.current.value);
    console.log(perthIdInput.current.value);
    console.log(emailAddressInput.current.value);
    console.log(passwordInput.current.value);
    console.log(remarkInput.current.value);
    // listRef.current.forEach(el => {
    //   if (el.value) {
    //     newObj[`${el.name}`] = el.value;
    //   }
    // });
    // fetch(`https://foes-3edf9-default-rtdb.asia-southeast1.firebasedatabase.app/database/${viewCollection}.json`, {
    //   method: 'POST',
    //   body: JSON.stringify(newObj)
    // })
    navigate('/');
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="title">
          <p>Admin</p>
        </div>
        <div className="bottom">
          <form onSubmit={submitHandler}>

            <div key='FirstName' className="formInput" >
              <label>First Name</label>
              <input type="text" name="FirstName" ref={firstNameInput} />
            </div>

            <div key='LastName' className="formInput" >
              <label>Last Name</label>
              <input type="text" name="LastName" ref={lastNameInput} />
            </div>

            <div key='miriId' className="formInput" >
              <label>Miri ID</label>
              <input type="text" name="miriId" ref={miriIdInput} />
            </div>

            <div key='perthId' className="formInput" >
              <label>Perth ID</label>
              <input type="text" name="perthId" ref={perthIdInput} />
            </div>

            <div key='emailAddress' className="formInput" >
              <label>Email Address</label>
              <input type="text" name="emailAddress" ref={emailAddressInput} />
            </div>

            <div key='password' className="formInput" >
              <label>Password</label>
              <input type="text" name="password" ref={passwordInput} />
            </div>

            <div key='remark' className="formInput" >
              <label>Remark</label>
              <input type="text" name="remark" ref={remarkInput} />
            </div>

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

export default AdminAddNew;