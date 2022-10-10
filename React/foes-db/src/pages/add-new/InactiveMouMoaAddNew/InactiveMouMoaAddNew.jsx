import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import './mouMoaAddNew.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import AddColumn from '../../../components/add-column/AddColumn';

const InactiveMouMoaAddNew = () => {
  const token = useSelector(state => state.auth.tokenId)

  const navigate = useNavigate();
  const programCategoryInput = useRef(null);
  const collaboratorsInput = useRef(null);
  const signedDateInput = useRef(null);
  const dueDateInput = useRef(null);
  const effectivePeriodInput = useRef(null);
  const agreementInput = useRef(null);
  const mutualExtensionInput = useRef(null);

  const [customColumn, setCustomColumn] = useState([]);
  let inputArr = customColumn;
  const listRef = useRef([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getInactiveMOUMOAColumns`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const filters = ["id", "type_of_agreement", "collaborators", "signed_date", "effective_period", "due_date", "agreement", "mutual_extension", "created_at", "updated_at"];

        setCustomColumn((data.column).filter((column) => !filters.includes(column)));
      });
  }, [token]);

  const onCustomColumnAddHandler = () => { 
    fetch(`http://127.0.0.1:8000/api/getInactiveMOUMOAColumns`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const filters = ["id", "type_of_agreement", "collaborators", "signed_date", "effective_period", "due_date", "agreement", "mutual_extension", "created_at", "updated_at"];

        setCustomColumn((data.column).filter((column) => !filters.includes(column)));
      }); 
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const jsonObject = {
      "type_of_agreement": programCategoryInput.current.value,
      "collaborators": collaboratorsInput.current.value,
      "signed_date": signedDateInput.current.value,
      "effective_period": effectivePeriodInput.current.value,
      "due_date": dueDateInput.current.value,
      "agreement": agreementInput.current.value,
      "mutual_extension": mutualExtensionInput.current.value
    };

    listRef.current.forEach(el => {
      if (el.value) {
        jsonObject[`${el.name}`] = el.value;
      }
    })

    fetch('http://127.0.0.1:8000/api/createInactiveMOUMOA', {
      method: 'POST',
      body: JSON.stringify(jsonObject),
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          navigate('/inactivemoumoa');
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
          <p>Inactive MOU MOA</p>
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

            <div key='collaborators' className="formInput" >
              <label>Collaborators</label>
              <input type="text" name="collaborators" ref={collaboratorsInput} />
            </div>
            <div key='signedDate' className="formInput">
              <label>Signed Date</label>
              <input type="date" name="signedDate" ref={signedDateInput}></input>
            </div>
            <div key='dueDate' className="formInput">
              <label>Due Date</label>
              <input type="date" name="dueDate" ref={dueDateInput}></input>
            </div>
            <div key='effectivePeriod' className="formInput" >
              <label>Effective Period</label>
              <input type="text" name="effectivePeriod" ref={effectivePeriodInput} />
            </div>
            <div key='agreement' className="formInput" >
              <label>Agreement</label>
              <input type="text" name="agreement" ref={agreementInput} />
            </div>
            <div key='mutualExtension' className="formInput" >
              <label>Mutual Extension</label>
              <input type="text" name="mutualExtension" ref={mutualExtensionInput} />
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
          <AddColumn apiEndPoint="addInactiveMOUMOAColumn" onCustomColumnAddHandler={onCustomColumnAddHandler}/>
        </div>
      </div>
    </div>
  );
};

export default InactiveMouMoaAddNew;