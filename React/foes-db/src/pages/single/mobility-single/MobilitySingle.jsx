import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/input/Input';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { Button } from '@mui/material';
import './mobilitySingle.scss';
import { useSelector } from 'react-redux';
import DocSection from '../../../components/DocSection/DocSection';

const MobilitySingle = () => {
  const token = useSelector(state => state.auth.tokenId);
  const [entry, setEntry] = useState({});
  const [attachments, setAttachments] = useState([]);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getMobility/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const { mobility } = data;
        setEntry(mobility);
      });
  }, [id, token]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getAttachment/mobility_id/${id}`, {
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
    fetch(`http://127.0.0.1:8000/api/getAttachment/mobility_id/${id}`, {
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

  const generateDocumentSection = (arr) => {
    let sectionHtml = [];
    for (var i = 0; i < arr.length; i++) {
      if (attachments[i] === null) {
        sectionHtml.push(
          <DocSection obj={null} index={i} attachments={attachments} setAttachments={setAttachments} staffID={id} key={`temp${i}`} attachmentId={null} updateAttachmentsHTTP={updateAttachmentsHTTP} url="mobility"/>
        );
      } else {
        sectionHtml.push(
          <DocSection obj={attachments[i]} index={i} attachments={attachments} setAttachments={setAttachments} key={attachments[i].id} staffID={id} attachmentId={attachments[i].id} updateAttachmentsHTTP={updateAttachmentsHTTP} url="mobility"/>
        );
      }
    }
    return sectionHtml;
  };

  const generatedForm = generateForm(entry);
  const generatedDocumentSection = generateDocumentSection(attachments)

  const onUpdateHandler = (event) => {
    event.preventDefault();
    fetch(`http://127.0.0.1:8000/api/updateMobility/${id}`, {
      method: 'PUT',
      body: JSON.stringify(entry),
      headers: {
        Authorization: `Bearer ${token}`
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

  const onAddNewDocument = () => {
    setAttachments([...attachments, null]);
  };

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
          <div className="content">
            {generatedDocumentSection}
            {/* <FileInputSection obj={null} /> */}
          </div>
          <div className="button-section">
            <button className='add-new-btn' onClick={onAddNewDocument}>Add New Document</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilitySingle;