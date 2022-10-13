import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/input/Input';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { Button } from '@mui/material';
import './staffSingle.scss';
import FileInputSection from '../../../components/section/FileInputSection';
import FileSection from '../../../components/file-section/FileSection';
import ResearchAwardsSection from '../../../components/research-awards-section/ResearchAwardsSection';
import { useSelector } from 'react-redux';

const StaffSingle = () => {

  const token = useSelector(state => state.auth.tokenId);
  const [entry, setEntry] = useState({});
  const [attachments, setAttachments] = useState([]);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  console.log(entry.miri_id);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [miriID, setMiriID] = useState();
  const [perthID, setPerthID] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [reportDuty, setReportDuty] = useState();
  const [department, setDepartment] = useState();
  const [title, setTitle] = useState();
  const [position, setPosition] = useState();
  const [roomNo, setRoomNo] = useState();
  const [extNo, setExtNo] = useState();
  const [status, setStatus] = useState();
  const [photocopyID, setPhotocopyID] = useState();
  const [appointmentLevel, setAppointmentLevel] = useState();
  const [pigeonBoxNo, setPigeonBoxNo] = useState();
  const [resignedDate, setResignedDate] = useState();
  const [remark, setRemark] = useState();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getStaff/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const { staff } = data;
        setEntry(staff);
      });
  }, [id, token]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getAttachment/staff/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const attachment = data.attachment;
        setAttachments(attachment);
      });
  }, [id, token]);

  const updateAttachmentsHTTP = () => {
    fetch(`http://127.0.0.1:8000/api/getAttachment/staff/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const attachment = data.attachment;
        setAttachments(attachment);
      });
  };

  const generateForm = (obj) => {
    let formHtml = [];

    const filters = ["id", "first_name", "last_name", "title", "miri_id", "perth_id", "report_duty_date", "position", "room_no", "ext_no", "status", "department", "email", "appointment_level", "photocopy_id", "pigeonbox_no", "resigned_date", "remark", "created_at", "updated_at"];

    for (const key in obj) {
      if (!(key == 'id' || key == 'created_at' || key == 'updated_at')) {
      // if (!filters.includes(key)) {
        formHtml.push(
          <Input name={key} key={key} initialValue={obj[key]} onFormChangeHandler={onFormChangeHandler} />
        );

      }
    }
    return formHtml;
  };

  const onFormChangeHandler = (key, value) => {
    let newEntry = entry;
    newEntry[key] = value;
    setEntry(newEntry);
  };

  const generateSection = (arr) => {
    let sectionHtml = [];
    for (var i = 0; i < arr.length; i++) {
      if (attachments[i] === null) {
        sectionHtml.push(
          <FileSection obj={null} index={i} attachments={attachments} setAttachments={setAttachments} staffID={id} key={`temp${i}`} attachmentId={null} updateAttachmentsHTTP={updateAttachmentsHTTP} />
        );
      } else {
        sectionHtml.push(
          <FileSection obj={attachments[i]} index={i} attachments={attachments} setAttachments={setAttachments} key={attachments[i].id} staffID={id} attachmentId={attachments[i].id} updateAttachmentsHTTP={updateAttachmentsHTTP} />
        );
      }
    }
    return sectionHtml;
  };

  const generatedForm = generateForm(entry);
  const generatedSection = generateSection(attachments);

  const onUpdateHandler = (event) => {
    event.preventDefault();
    fetch(`http://127.0.0.1:8000/api/updateStaff/${id}`, {
      method: 'PUT',
      body: JSON.stringify(entry),
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

  const onAddNewDocument = () => {
    setAttachments([...attachments, null]);
  };

  // console.log(...attachments);
  // console.log(attachments);

  return (
    <div className="single">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="title">Update</div>
        <div className="content">
          <div className="singleEntry">
            <form className='entryForm' onSubmit={onUpdateHandler}>
              {generatedForm}
              <Button type='submit'>Update</Button>
            </form>
            <div className="break" />
          </div>
        </div>
        <div className="content">
          {generatedSection}
          {/* <FileInputSection obj={null} /> */}
        </div>
        <div className="button-section">
          <button className='add-new-btn' onClick={onAddNewDocument}>Add New Document</button>
        </div>
        {/* <FileInputSection /> */}
        <div className="section">
          <div className="title">Research Awards</div>
          <ResearchAwardsSection staffId={entry.miri_id} />
        </div>
      </div>
    </div>
  );
};

export default StaffSingle;
