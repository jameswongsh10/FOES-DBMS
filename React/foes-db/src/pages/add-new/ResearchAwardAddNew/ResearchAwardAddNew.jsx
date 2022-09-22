import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';

import './researchAwardAddNew.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import AddColumn from '../../../components/add-column/AddColumn';

const ResearchAwardAddNew = () => {
  const navigate = useNavigate();
  const staffNameInput = useRef(null);
  const typeOfGrantInput = useRef(null);
  const projectTitleInput = useRef(null);
  const coInvestigatorInput = useRef(null);
  const researchGrantSchemeInput = useRef(null);
  const awardAmountInput = useRef(null);
  const evidenceLinkInput = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();
    // listRef.current.forEach(el => {
    //   if (el.value) {
    //     newObj[`${el.name}`] = el.value;
    //   }
    // });
    // fetch(`https://foes-3edf9-default-rtdb.asia-southeast1.firebasedatabase.app/database/${viewCollection}.json`, {
    //   method: 'POST',
    //   body: JSON.stringify(newObj)
    // })
    navigate('/research-award');
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="title">
          <p>Research-Award</p>
        </div>
        <div className="bottom">
          <form onSubmit={submitHandler}>

            <div key='staffName' className="formInput" >
              <label>Staff Name</label>
              <input type="text" name="staffName" ref={staffNameInput} />
            </div>
            <div key='typeOfGrant' className="formInput" >
              <label>Type of Grant</label>
              <input type="text" name="typeOfGrant" ref={typeOfGrantInput} />
            </div>
            <div key='projectTitle' className="formInput" >
              <label>Project Title</label>
              <input type="text" name="projectTitle" ref={projectTitleInput} />
            </div>
            <div key='coInvestigators' className="formInput" >
              <label>Co-investigators</label>
              <input type="text" name="conInvestigators" ref={coInvestigatorInput} />
            </div>
            <div key='researchGrantScheme' className="formInput" >
              <label>Research Grant Scheme</label>
              <input type="text" name="researchGrantScheme" ref={researchGrantSchemeInput} />
            </div>
            <div key='awardAmount' className="formInput" >
              <label>Award Amount</label>
              <input type="text" name="awardAmount" ref={awardAmountInput} />
            </div>
            <div key='evidenceLink' className="formInput" >
              <label>Evidence Link</label>
              <input type="text" name="evidenceLink" ref={evidenceLinkInput} />
            </div>

            {/* TODO: Add Attachment tag in here */}

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

export default ResearchAwardAddNew;