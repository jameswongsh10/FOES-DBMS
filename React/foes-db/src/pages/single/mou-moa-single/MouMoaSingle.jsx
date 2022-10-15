import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/input/Input';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { Button } from '@mui/material';
import './mouMoaSingle.scss';
import KeyPersonSection from '../../../components/key-person-section/KeyPersonSection';
import { useSelector } from 'react-redux';
import FileSection from '../../../components/file-section/FileSection';
import DocSection from '../../../components/DocSection/DocSection';

const MouMoaSingle = () => {
  const token = useSelector(state => state.auth.tokenId);
  const [entry, setEntry] = useState({});
  const [keyPersons, setKeyPersons] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getMOUMOA/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const { MOUMOA } = data;
        setEntry(MOUMOA);
      });
  }, [id, token]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getKeyContactPerson/moumoa/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const KeyContactPerson = data.awards;
        setKeyPersons(KeyContactPerson);
      });
  }, [id, token]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getAttachment/moumoa_id/${id}`, {
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
    fetch(`http://127.0.0.1:8000/api/getAttachment/moumoa_id/${id}`, {
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

  const generateSection = (arr) => {
    let sectionHtml = [];
    for (var i = 0; i < arr.length; i++) {
      if (keyPersons[i] === null) {
        sectionHtml.push(
          <KeyPersonSection obj={null} index={i} keyPersons={keyPersons} setKeyPersons={setKeyPersons} mouID={id} key={`temp${i}`} />
        );
      } else {
        sectionHtml.push(
          <KeyPersonSection obj={keyPersons[i]} index={i} keyPersons={keyPersons} setKeyPersons={setKeyPersons} key={keyPersons[i].id} mouID={id} />
        );
      }
    }
    return sectionHtml;
  };

  const generateDocumentSection = (arr) => {
    let sectionHtml = [];
    for (var i = 0; i < arr.length; i++) {
      if (attachments[i] === null) {
        sectionHtml.push(
          <DocSection obj={null} index={i} attachments={attachments} setAttachments={setAttachments} staffID={id} key={`temp${i}`} attachmentId={null} updateAttachmentsHTTP={updateAttachmentsHTTP} url="moumoa"/>
        );
      } else {
        sectionHtml.push(
          <DocSection obj={attachments[i]} index={i} attachments={attachments} setAttachments={setAttachments} key={attachments[i].id} staffID={id} attachmentId={attachments[i].id} updateAttachmentsHTTP={updateAttachmentsHTTP} url="moumoa"/>
        );
      }
    }
    return sectionHtml;
  };

  const generatedForm = generateForm(entry);
  const generatedKeyPersonSection = generateSection(keyPersons);
  const generatedDocumentSection = generateDocumentSection(attachments)

  const onUpdateHandler = (event) => {
    event.preventDefault();
    fetch(`http://127.0.0.1:8000/api/updateMOUMOA/${id}`, {
      method: 'PUT',
      body: JSON.stringify(entry),
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          navigate('/moumoa');
          return response.json();
        }
        return Promise.reject(response);
      })
      .catch(response => {
        response.json().then(json => alert(json.message));
      });
  };

  const onAddNewKeyPerson = () => {
    setKeyPersons([...keyPersons, null]);
  };

  const onAddNewDocument = () => {
    setAttachments([...attachments, null]);
  };

  console.log(keyPersons);

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
            <div className="title">Key Contact Person</div>
            {generatedKeyPersonSection}
            {/* <FileInputSection obj={null} /> */}
          </div>
          <div className="button-section">
            <button className="add-new-btn" onClick={onAddNewKeyPerson}>ADD NEW KEY CONTACT PERSON</button>
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

export default MouMoaSingle;
