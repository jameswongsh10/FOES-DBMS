import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import './researchAwardAddNew.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import AddColumn from '../../../components/add-column/AddColumn';

const ResearchAwardAddNew = () => {
  const token = useSelector(state => state.auth.tokenId)
  const navigate = useNavigate();
  const staffIdInput = useRef(null);
  const typeOfGrantInput = useRef(null);
  const projectTitleInput = useRef(null);
  const coInvestigatorInput = useRef(null);
  const researchGrantSchemeInput = useRef(null);
  const awardAmountInput = useRef(null);
  const evidenceLinkInput = useRef(null);
  const staffMiriIdInput = useRef(null);

  const [customColumn, setCustomColumn] = useState([]);

  let inputArr = customColumn;
  const listRef = useRef([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getAwardsColumns`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const filters = ["id", "staff_id", "type_of_grant", "project_title", "co_investigators", "research_grant_scheme", "award_amount", "evidence_link", "created_at", "updated_at", "staff_miri_id"]

        setCustomColumn((data.column).filter((column) => !filters.includes(column)));
      });
  }, [token]);

  const onCustomColumnAddHandler = () => {
    fetch(`http://127.0.0.1:8000/api/getAwardsColumns`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const filters = ["id", "staff_id", "type_of_grant", "project_title", "co_investigators", "research_grant_scheme", "award_amount", "evidence_link", "created_at", "updated_at", "staff_miri_id"]

        setCustomColumn((data.column).filter((column) => !filters.includes(column)));
      });
  }

 // console.log(customColumn);

  const submitHandler = (event) => {
    event.preventDefault();
    const jsonObject = {
      // "staff_id" : staffIdInput.current.value,
      "staff_miri_id": staffMiriIdInput.current.value,
      "type_of_grant": typeOfGrantInput.current.value,
      "project_title": projectTitleInput.current.value,
      "co_investigators": coInvestigatorInput.current.value,
      "research_grant_scheme": researchGrantSchemeInput.current.value,
      "award_amount": awardAmountInput.current.value,
      "evidence_link": evidenceLinkInput.current.value,
    };

    listRef.current.forEach(el => {
      if (el.value) {
        jsonObject[`${el.name}`] = el.value;
      }
    })

    fetch('http://127.0.0.1:8000/api/createAwards', {
      method: 'POST',
      body: JSON.stringify(jsonObject),
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        navigate('/awards');
        return response.json();
      }
      return Promise.reject(response);
    })
    .catch(response => {
      response.json().then(json => alert(json.message));
    });
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

            <div key='staffMiriId' className="formInput" >
              <label>Staff Miri ID</label>
              <input type="text" min='0' name="staffMiriId" ref={staffMiriIdInput} />
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
          <AddColumn apiEndPoint="addAwardsColumn" onCustomColumnAddHandler={onCustomColumnAddHandler}/>
        </div>
      </div>
    </div>
  );
};

export default ResearchAwardAddNew;
