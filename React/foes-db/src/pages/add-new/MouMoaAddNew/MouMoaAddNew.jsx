import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';

import './mouMoaAddNew.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import AddColumn from '../../../components/add-column/AddColumn';

const MouMoaAddNew = () => {
  const token = useSelector(state => state.auth.tokenId)
  const navigate = useNavigate();
  
  const programCategoryInput = useRef(null);
  const countryInput = useRef(null);
  const institutionInput = useRef(null);
  const signedDateInput = useRef(null);
  const dueDateInput = useRef(null);
  const progressInput = useRef(null);
  const areaOfCollaborationInput = useRef(null);
  const researchInput = useRef(null);
  const collaborationPartnershipInput = useRef(null);
  const exchangeInput = useRef(null);
  const teachingInput = useRef(null);
  const mutualExtensionInput = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();
    const jsonObject = {
      "country": countryInput.current.value,
      "institution": institutionInput.current.value,
      "signed_date": signedDateInput.current.value,
      "due_date": dueDateInput.current.value,
      "area_of_collab": areaOfCollaborationInput.current.value,
      "progress": progressInput.current.value,
      // type_of_agreement: is to be changed to programCategory
      "type_of_agreement": programCategoryInput.current.value,
      "research": researchInput.current.value,
      "teaching": teachingInput.current.value,
      "exchange": exchangeInput.current.value,
      "collab_and_partnerships": collaborationPartnershipInput.current.value,
      "mutual_extension": mutualExtensionInput.current.value
    };

    fetch('http://127.0.0.1:8000/api/createMOUMOA', {
      method: 'POST',
      body: JSON.stringify(jsonObject),
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
    .then(navigate('/mou-moa'));
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="title">
          <p>MOU MOA</p>
        </div>
        <div className="bottom">
          <form onSubmit={submitHandler}>
     
          <div className="formInput">
              <label>Program Category</label>
              <select name="programCategory" id="programCategory" ref={programCategoryInput}>
                <option value="MOU">MOU</option>
                <option value="MOA">MOA</option>
              </select>
            </div>
     
            <div key='country' className="formInput" >
              <label>Country</label>
              <input type="text" name="country" ref={countryInput} />
            </div>
            <div key='institution' className="formInput" >
              <label>Institution</label>
              <input type="text" name="institution" ref={institutionInput} />
            </div>
            <div key='signedDate' className="formInput">
              <label>Signed Date</label>
              <input type="date" name="signedDate" ref={signedDateInput}></input>
            </div> 
            <div key='dueDate' className="formInput">
              <label>Due Date</label>
              <input type="date" name="dueDate" ref={dueDateInput}></input>
            </div>
            <div key='progress' className="formInput" >
              <label>Progress</label>
              <input type="text" name="progress" ref={progressInput} />
            </div>
            <div key='areaOfCollaboration' className="formInput" >
              <label>Are of Collaboration</label>
              <input type="text" name="areaOfCollaboration" ref={areaOfCollaborationInput} />
            </div>
            <div key='research' className="formInput" >
              <label>Research</label>
              <input type="number" min="0" name="research" ref={researchInput} />
            </div>

            <div key='collaborationPartnership' className="formInput" >
              <label>Collaboration & Partnership</label>
              <input type="number" min="0" name="collaborationPartnership" ref={collaborationPartnershipInput} />
            </div>
            <div key='exchange' className="formInput" >
              <label>Exchange</label>
              <input type="number" min="0" name="exchange" ref={exchangeInput} />
            </div>
            <div key='teaching' className="formInput" >
              <label>Teaching</label>
              <input type="number" min="0" name="teaching" ref={teachingInput} />
            </div>
            <div key='mutualExtension' className="formInput" >
              <label>Mutual Extension</label>
              <input type="text" name="mutualExtension" ref={mutualExtensionInput} />
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

export default MouMoaAddNew;