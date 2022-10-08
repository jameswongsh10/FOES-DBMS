import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/input/Input';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { Button } from '@mui/material';
import './mouMoaSingle.scss';
import KeyPersonSection from '../../../components/key-person-section/KeyPersonSection';

const MouMoaSingle = () => {

  const [entry, setEntry] = useState({});
  const [keyPersons, setKeyPersons] = useState([]);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getMOUMOA/${id}`)
      .then(response => response.json())
      .then(data => {
        const { MOUMOA } = data;
        setEntry(MOUMOA);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getKeyContactPerson/moumoa/${id}`)
      .then(response => response.json())
      .then(data => {
        const KeyContactPerson = data.awards;
        setKeyPersons(KeyContactPerson);
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

  const generatedForm = generateForm(entry);
  const generatedSection = generateSection(keyPersons);

  const onUpdateHandler = (event) => {
    event.preventDefault();
    const response = fetch(`http://127.0.0.1:8000/api/updateMOUMOA/${id}`, {
      method: 'PUT',
      body: JSON.stringify(entry)
    });

    response && navigate('/staff');
  };

  const onAddNewKeyPerson = () => {
    setKeyPersons([...keyPersons, null]);
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
            {generatedSection}
            {/* <FileInputSection obj={null} /> */}
          </div>
          <button onClick={onAddNewKeyPerson}>Add New Doc</button>
        </div>
      </div>
    </div>
  );
};

export default MouMoaSingle;