import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';

import './staffAddNew.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import AddColumn from '../../../components/add-column/AddColumn';
import ProfessionalQualification from '../../../components/section/ProfessionalQualification';

const StaffAddNew = () => {
  const navigate = useNavigate();

  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const miriIdInput = useRef(null);
  const perthIdInput = useRef(null);
  const emailAddressInput = useRef(null);
  const reportDutyInput = useRef(null);
  const departmentInput = useRef(null);
  const titleInput = useRef(null);
  const positionInput = useRef(null);
  const roomNoInput = useRef(null);
  const extNoInput = useRef(null);
  const statusInput = useRef(null);
  const photocopyIdInput = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(firstNameInput.current.value); // Use this refs to store the JSON and POST request
    console.log(lastNameInput.current.value);
    console.log(miriIdInput.current.value);
    console.log(perthIdInput.current.value);
    console.log(emailAddressInput.current.value);
    console.log(reportDutyInput.current.value);
    console.log(departmentInput.current.value);
    console.log(titleInput.current.value);
    console.log(positionInput.current.value);
    console.log(roomNoInput.current.value);
    console.log(extNoInput.current.value);
    console.log(statusInput.current.value);
    console.log(photocopyIdInput.current.value);

    // listRef.current.forEach(el => {
    //   if (el.value) {
    //     newObj[`${el.name}`] = el.value;
    //   }
    // });
    // fetch(`https://foes-3edf9-default-rtdb.asia-southeast1.firebasedatabase.app/database/${viewCollection}.json`, {
    //   method: 'POST',
    //   body: JSON.stringify(newObj)
    // })
    navigate('/staff');
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="title">
          <p>Staff</p>
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

            <div key='reportDuty' className="formInput">
              <label>Report Duty</label>
              <input type="date" name="reportDuty" ref={reportDutyInput}></input>
            </div>

            <div key='department' className="formInput" >
              <label>Department</label>
              <input type="text" name="department" ref={departmentInput} />
            </div>

            <div className="formInput">
              <label>Title</label>
              <select name="title" id="title" ref={titleInput}>
                <option value="Dr.">Dr.</option>
                <option value="Ir.">IR.</option>
                <option value="Dr. Ir.">Dr. Ir.</option>
                <option value="Ir. Dr.">Ir. Dr.</option>
                <option value="Engr.">Engr.</option>
              </select>
            </div>

            <div key='position' className="formInput" >
              <label>Position</label>
              <input type="text" name="position" ref={positionInput} />
            </div>

            <div key='roomNo' className="formInput" >
              <label>Room No.</label>
              <input type="text" name="roomNo" ref={roomNoInput} />
            </div>

            <div key='extNo' className="formInput" >
              <label>Ext No.</label>
              <input type="text" name="extNo" ref={extNoInput} />
            </div>

            <div key='status' className="formInput" >
              <label>Status</label>
              <input type="text" name="status" ref={statusInput} />
            </div>

            <div key='photocopyId' className="formInput" >
              <label>Photocopy ID</label>
              <input type="text" name="photocopyId" ref={photocopyIdInput} />
            </div>

            <Button type='submit'>Send</Button>
          </form>
        </div>

        <ProfessionalQualification />

        <div className="addColumnBox">
          <p className='title'>Add Column</p>
          <AddColumn />
        </div>
      </div>
    </div>
  );
};

export default StaffAddNew;