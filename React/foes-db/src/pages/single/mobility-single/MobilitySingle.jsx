import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/input/Input';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { Button } from '@mui/material';
import './mobilitySingle.scss';

const MobilitySingle = () => {
  const [entry, setEntry] = useState({});
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getMobility/${id}`)
      .then(response => response.json())
      .then(data => {
        const { mobility } = data;
        setEntry(mobility);
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

  const generatedForm = generateForm(entry);

  const onUpdateHandler = (event) => {
    event.preventDefault();
    const response = fetch(`http://127.0.0.1:8000/api/updateMobility/${id}`, {
      method: 'PUT',
      body: JSON.stringify(entry)
    });

    response && navigate('/mobility');
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
        </div>
      </div>
    </div>
  );
}

export default MobilitySingle