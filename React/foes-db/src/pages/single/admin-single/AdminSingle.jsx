import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/input/Input';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { Button } from '@mui/material';
import './adminSingle.scss';
import { useSelector } from 'react-redux';

const AdminSingle = () => {

  const token = useSelector(state => state.auth.tokenId)
  const [entry, setEntry] = useState({});
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getAdmin/${id}`, { 
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const { admin } = data;
        setEntry(admin);
      });
  }, [id, token]);

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
    fetch(`http://127.0.0.1:8000/api/updateAdmin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(entry),
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        navigate('/');
        return response.json();
      }
      return Promise.reject(response);
    })
    .catch(response => {
      response.json().then(json => alert(json.message));
    });

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
};

export default AdminSingle;