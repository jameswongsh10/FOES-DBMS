import { Button } from '@mui/material';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddSingleColumn from '../add-single-column/AddSingleColumn';
import Input from '../input/Input';
import './singleEntry.scss';

const SingleEntry = () => {

  const viewCollection = useSelector(state => state.table.view);
  const singleID = useSelector(state => state.table.singleID);
  const [entry, setEntry] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://foes-3edf9-default-rtdb.asia-southeast1.firebasedatabase.app./database/${viewCollection}/${singleID}.json`)
      .then(response => response.json())
      .then(data => setEntry(data));
    // check if the singleID is changed when useEffect is triggered, which brings fetch request of /database/${viewCollection}/NULL.json resulting error when the page is reloaded.
  }, [viewCollection, singleID]);

  const generateForm = (obj) => {
    let formHtml = [];
    for (const key in obj) {
      formHtml.push(
        <Input name={key} key={key} initialValue={obj[key]} onFormChangeHandler={onFormChangeHandler} />
      );
    }
    return formHtml;
  };

  const onFormChangeHandler = (key, value) => {
    let newEntry = entry;
    newEntry[key] = value;
    setEntry(newEntry);
  };

  const generatedForm = generateForm(entry);

  const onAddColumnHandler = (name) => {
    let newEntry = {...entry};
    newEntry[name] = '';
    // let newEntry = { ...entry, key: '' };
    console.log(newEntry);
    setEntry(newEntry);
  };

  const onUpdateHandler = (event) => {
    event.preventDefault();
    const response = fetch(`https://foes-3edf9-default-rtdb.asia-southeast1.firebasedatabase.app./database/${viewCollection}/${singleID}.json`, {
      method: 'PUT',
      body: JSON.stringify(entry)
    });
    
    response && navigate('/');
  }

  return (
    <>
      <div className="singleEntry">
        <form className='entryForm' onSubmit={onUpdateHandler}>
          {generatedForm}
          <Button type='submit'>Update</Button>
        </form>
        <div className="break" />
      </div>
      <div className="addColumnBox">
        <p className='title'>Add Column</p>
        <AddSingleColumn onAddColumnHandler={onAddColumnHandler} />
      </div>
    </>
  );
};

export default SingleEntry;