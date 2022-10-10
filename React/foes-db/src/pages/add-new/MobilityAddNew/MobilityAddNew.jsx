import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import './mobilityAddNew.scss';
import { useNavigate } from 'react-router-dom';
import { Button, duration } from '@mui/material';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import AddColumn from '../../../components/add-column/AddColumn';

const MobilityAddNew = () => {
  const token = useSelector(state => state.auth.tokenId)
  const navigate = useNavigate();

  const staffStudentInput = useRef(null);
  const inboundOutboundInput = useRef(null);
  const nameInput = useRef(null);
  const studentIdStaffIdInput = useRef(null);
  const programInput = useRef(null);
  const nameOfUniversityInput = useRef(null);
  const countryInput = useRef(null);
  const fromInput = useRef(null);
  const toInput = useRef(null);
  const durationsInput = useRef(null);
  const remarkInput = useRef(null);

  const [customColumn, setCustomColumn] = useState([]);

  let inputArr = customColumn;
  const listRef = useRef([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getMobilityColumns/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const filters = ["id", "staff_or_student", "in_or_out_bound", "name", "attendee_id", "program", "name_of_university", "country", "duration", "from_date", "to_date", "remark", "created_at", "updated_at"];

        setCustomColumn((data.column).filter((column) => !filters.includes(column)));
      });
  }, [token]);

  const onCustomColumnAddHandler = () => {
    fetch(`http://127.0.0.1:8000/api/getMobilityColumns/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const filters = ["id", "staff_or_student", "in_or_out_bound", "name", "attendee_id", "program", "name_of_university", "country", "duration", "from_date", "to_date", "remark", "created_at", "updated_at"];

        setCustomColumn((data.column).filter((column) => !filters.includes(column)));
      }); 
  }

  console.log(customColumn);

  const submitHandler = (event) => {
    event.preventDefault();
    const jsonObject = {
      "staff_or_student": staffStudentInput.current.value,
      "in_or_out_bound": inboundOutboundInput.current.value,
      "name": nameInput.current.value,
      "attendee_id": studentIdStaffIdInput.current.value,
      "program": programInput.current.value,
      "name_of_university": nameOfUniversityInput.current.value,
      "country": countryInput.current.value,
      "duration": durationsInput.current.value,
      "from_date": fromInput.current.value,
      "to_date": toInput.current.value,
      "remark": remarkInput.current.value,
    };

    listRef.current.forEach(el => {
      if (el.value) {
        jsonObject[`${el.name}`] = el.value;
      }
    })

    fetch('http://127.0.0.1:8000/api/createMobility', {
      method: 'POST',
      body: JSON.stringify(jsonObject),
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          navigate('/mobility');
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
          <p>Mobility</p>
        </div>
        <div className="bottom">
          <form onSubmit={submitHandler}>

            <div className="formInput">
              <label>Staff/Student</label>
              <select name="staffStudent" ref={staffStudentInput}>
                <option value="Staff">Staff</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div className="formInput">
              <label>Inbound/Outbound</label>
              <select name="inboundOutbound" ref={inboundOutboundInput}>
                <option value="Inbound">Inbound</option>
                <option value="Outbound">Outbound</option>
              </select>
            </div>
            <div key='name' className="formInput" >
              <label>Name</label>
              <input type="text" name="name" ref={nameInput} />
            </div>
            <div key='studentIdStaffId' className="formInput" >
              <label>Student ID/ Staff ID</label>
              <input type="text" name="studentIdStaffId" ref={studentIdStaffIdInput} />
            </div>
            <div key='program' className="formInput" >
              <label>Program</label>
              <input type="text" name="program" ref={programInput} />
            </div>
            <div key='nameOfUniversity' className="formInput" >
              <label>Name of University</label>
              <input type="text" name="nameOfUniversity" ref={nameOfUniversityInput} />
            </div>
            <div key='country' className="formInput" >
              <label>Country</label>
              <input type="text" name="country" ref={countryInput} />
            </div>
            <div key='from' className="formInput">
              <label>From</label>
              <input type="date" name="from" ref={fromInput}></input>
            </div>
            <div key='to' className="formInput">
              <label>To</label>
              <input type="date" name="to" ref={toInput}></input>
            </div>
            {/* date input */}
            <div key='durations' className="formInput" >
              <label>Durations (days)</label>
              <input type="text" name="durations" ref={durationsInput} />
            </div>
            <div key='remarks' className="formInput" >
              <label>Remarks</label>
              <input type="text" name="remarks" ref={remarkInput} />
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
          <AddColumn apiEndPoint="addMobilityColumn" onCustomColumnAddHandler={onCustomColumnAddHandler}/>
        </div>
      </div>
    </div>
  );
};

export default MobilityAddNew;