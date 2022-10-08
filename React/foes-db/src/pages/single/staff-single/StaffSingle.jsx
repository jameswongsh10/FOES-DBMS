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

const StaffSingle = () => {

  const [entry, setEntry] = useState({});
  const [attachments, setAttachments] = useState([]);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getStaff/${id}`)
      .then(response => response.json())
      .then(data => {
        const { staff } = data;
        setEntry(staff);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getAttachment/staff/${id}`)
      .then(response => response.json())
      .then(data => {
        const attachment = data.attachment;
        setAttachments(attachment);
      });
  }, [id]);


  const generateForm = (obj) => {
    let formHtml = [];
    for (const key in obj) {
      if (!(key == 'id' || key == 'created_at' || key == 'updated_at')) {
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
          <FileSection obj={null} index={i} attachments={attachments} setAttachments={setAttachments} staffID={id} key={`temp${i}`}/>
        );
      } else {
        sectionHtml.push(
          <FileSection obj={attachments[i]} index={i} attachments={attachments} setAttachments={setAttachments} key={attachments[i].id} staffID={id} />
        );
      }
    }
    return sectionHtml;
  };

  const generatedForm = generateForm(entry);
  const generatedSection = generateSection(attachments);

  const onUpdateHandler = (event) => {
    event.preventDefault();
    const response = fetch(`http://127.0.0.1:8000/api/updateStaff/${id}`, {
      method: 'PUT',
      body: JSON.stringify(entry)
    });

    response && navigate('/staff');
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
        <button onClick={onAddNewDocument}>Add New Doc</button>
        {/* <FileInputSection /> */}
        <div className="section">
          <ResearchAwardsSection staffId={id}/>
        </div>
      </div>
    </div>
  );
};

export default StaffSingle;