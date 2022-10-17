import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';

import './staffAddNew.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import AddColumn from '../../../components/add-column/AddColumn';
import InputEmail from '../../../components/input-email/InputEmail';
import { useEffect } from 'react';
import FileInputSection from '../../../components/section/FileInputSection';
import URL from '../../../store/url';

const StaffAddNew = () => {
  const token = useSelector(state => state.auth.tokenId);
  const navigate = useNavigate();

  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const miriIdInput = useRef(null);
  const perthIdInput = useRef(null);
  const reportDutyInput = useRef(null);
  const departmentInput = useRef(null);
  const titleInput = useRef(null);
  const positionInput = useRef(null);
  const roomNoInput = useRef(null);
  const extNoInput = useRef(null);
  const statusInput = useRef(null);
  const photocopyIdInput = useRef(null);
  const appointmentLevelInput = useRef(null);
  const pigeaonboxNoInput = useRef(null);
  const resignedDateInput = useRef(null);
  const remarkInput = useRef(null);

  const [customColumn, setCustomColumn] = useState([]);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  let inputArr = customColumn;
  const listRef = useRef([]);

  useEffect(() => {
    if (isEmailValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isEmailValid]);

  useEffect(() => {
    fetch(`${URL}/api/getStaffColumns`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const filters = ["id", "first_name", "last_name", "title", "miri_id", "perth_id", "report_duty_date", "position", "room_no", "ext_no", "status", "department", "email", "appointment_level", "photocopy_id", "pigeonbox_no", "resigned_date", "remark", "created_at", "updated_at"];

        setCustomColumn((data.column).filter((column) => !filters.includes(column)));
      });
  }, [token]);

  const onCustomColumnAddHandler = () => {
    fetch(`${URL}/api/getStaffColumns`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const filters = ["id", "first_name", "last_name", "title", "miri_id", "perth_id", "report_duty_date", "position", "room_no", "ext_no", "status", "department", "email", "appointment_level", "photocopy_id", "pigeonbox_no", "resigned_date", "remark", "created_at", "updated_at"];

        setCustomColumn((data.column).filter((column) => !filters.includes(column)));
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let jsonObject = {
      "first_name": firstNameInput.current.value,
      "last_name": lastNameInput.current.value,
      "miri_id": miriIdInput.current.value,
      "perth_id": perthIdInput.current.value,
      "email": email,
      "report_duty_date": reportDutyInput.current.value,
      "department": departmentInput.current.value,
      "title": titleInput.current.value,
      "position": positionInput.current.value,
      "room_no": roomNoInput.current.value,
      "ext_no": extNoInput.current.value,
      "status": statusInput.current.value,
      "photocopy_id": photocopyIdInput.current.value,
      "appointment_level": appointmentLevelInput.current.value,
      "pigeonbox_no": pigeaonboxNoInput.current.value,
      "resigned_date": resignedDateInput.current.value === "" ? null : resignedDateInput.current.value,
      "remark": remarkInput.current.value,
    };

    //console.log(jsonObject);

    listRef.current.forEach(el => {
      if (el.value) {
        jsonObject[`${el.name}`] = el.value;
      }
    });

    fetch(`${URL}/api/createStaff`, {
      method: 'POST',
      body: JSON.stringify(jsonObject),
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          navigate('/staff');
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

            <InputEmail value={email} setHandler={setEmail} label="Email Address" isValid={isEmailValid} setIsValid={setIsEmailValid} />

            <div key='reportDuty' className="formInput">
              <label>Report Duty</label>
              <input type="date" name="reportDuty" ref={reportDutyInput}></input>
            </div>

            <div className="formInput">
              <label>Department</label>
              <select name="department" id="department" ref={departmentInput}>
                <option value="Faculty Office">Faculty Office</option>
                <option value="Lab">Lab</option>
                <option value="Applied Sciences">Applied Sciences</option>
                <option value="Chemical & Energy">Chemical & Energy</option>
                <option value="Civil & Construction">Civil & Construction</option>
                <option value="Electrical & Computer">Electrical & Computer</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Foundation">Foundation</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="formInput">
              <label>Title</label>
              <select name="title" id="title" ref={titleInput}>
                <option value="Dr.">Dr.</option>
                <option value="Ir.">IR.</option>
                <option value="Dr. Ir.">Dr. Ir.</option>
                <option value="Ir. Dr.">Ir. Dr.</option>
                <option value="Engr.">Engr.</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="formInput">
              <label>Position</label>
              <select name="position" id="position" ref={positionInput}>
                <option value="Dean">Dean</option>
                <option value="Associate Dean R&D">Associate Dean R&D</option>
                <option value="Associate Dean T&L">Associate Dean T&L</option>
                <option value="HOD">HOD</option>
                <option value="Programme Coordinator">Programme Coordinator</option>
                <option value="Committee Chair">Committee Chair</option>
                <option value="Research Cluster Head">Research Cluster Head</option>
                <option value="Group Head">Group Head</option>
                <option value="Faculty Manager">Faculty Manager</option>
                <option value="Senior Admin Officer">Senior Admin Officer</option>
                <option value="Admin Officer">Admin Officer</option>
                <option value="Senior Admin Assistant">Senior Admin Assistant</option>
                <option value="Admin Assistant">Admin Assistant</option>
                <option value="Lab Manager">Lab Manager</option>
                <option value="Senior Technical Officer">Senior Technical Officer</option>
                <option value="IT Engineering Officer">IT Engineering Officer</option>
                <option value="Technical Officer">Technical Officer</option>
                <option value="Senior Lab Technician">Senior Lab Technician</option>
                <option value="Lab Technician">Lab Technician</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div key='roomNo' className="formInput" >
              <label>Room No.</label>
              <input type="text" name="roomNo" ref={roomNoInput} />
            </div>

            <div key='extNo' className="formInput" >
              <label>Ext No.</label>
              <input type="text" name="extNo" ref={extNoInput} />
            </div>

            <div className="formInput">
              <label>Status</label>
              <select name="status" id="status" ref={statusInput}>
                <option value="Contract">Contract</option>
                <option value="Permanent">Permanent</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div key='photocopyId' className="formInput" >
              <label>Photocopy ID</label>
              <input type="text" name="photocopyId" ref={photocopyIdInput} />
            </div>

            <div className="formInput">
              <label>Appointment Level</label>
              <select name="appointmentLevel" id="appointmentLevel" ref={appointmentLevelInput}>
                <option value="Professor">Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Senior Lecturer">Senior Lecturer</option>
                <option value="Lecturer">Lecturer</option>
                <option value="Associate Lecturer">Associate Lecturer</option>
                <option value="Dean">Dean</option>
                <option value="Manager">Manager</option>
                <option value="Senior Office">Senior Office</option>
                <option value="Officer">Officer</option>
                <option value="Admin Assistance">Admin Assistance</option>
                <option value="Technician">Technician</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div key='pigeonboxNo' className="formInput" >
              <label>Pigeon Box No.</label>
              <input type="text" name="pigeonboxNo" ref={pigeaonboxNoInput} />
            </div>

            <div key='resignedDate' className="formInput">
              <label>Resigned Date</label>
              <input type="date" name="resignedDate" ref={resignedDateInput}></input>
            </div>

            <div key='remark' className="formInput" >
              <label>Remark</label>
              <input type="text" name="remark" ref={remarkInput} />
            </div>

            {inputArr.map((label, i) => {
              return (
                <div key={label} className="formInput" >
                  <label>{label}</label>
                  <input type="text" name={label} ref={(ref) => (listRef.current[i] = ref)} />
                </div>
              );
            })}

            <Button disabled={!isFormValid} type='submit'>Send</Button>

          </form>
        </div>

        {/* <FileInputSection sectionTitle="Professional Qualification"/> */}
        {/* <FileInputSection sectionTitle="Professional Membership"/> */}

        <div className="addColumnBox">
          <p className='title'>Add Column</p>
          <AddColumn apiEndPoint="addStaffColumn" onCustomColumnAddHandler={onCustomColumnAddHandler} />
        </div>
      </div>
    </div>
  );
};

export default StaffAddNew;
