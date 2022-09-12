import React from 'react';
import { useState } from 'react';
import './input.scss';

const Input = (props) => {

  const [value, setValue] = useState(props.initialValue);

  const onChangeHandler = (event) => {
    setValue(event.target.value);
    props.onFormChangeHandler(props.name, event.target.value);
  }

  return (
    <div className="formInput">
      <label>{props.name}</label>
      <input type="text" name={props.name} value={value} onChange={(event) => onChangeHandler(event)} />
    </div>
  );
};

export default Input;