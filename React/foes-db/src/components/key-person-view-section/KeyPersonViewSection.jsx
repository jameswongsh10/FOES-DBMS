import React from 'react'

const KeyPersonViewSection = (props) => {

  const onEditHandler = () => {
    props.setIsEditing(true);
  }

  const onDeleteHandler = () => {
    fetch(`http://127.0.0.1:8000/api/deleteKeyContactPerson/${props.obj.id}`, {
      method: 'DELETE'
    })
    const newKeyPersons = (props.keyPersons).filter((element, i) => !(i === props.index));
    props.setKeyPersons(newKeyPersons);
  }

  return (
    <div className="section">
      <div className="form">
        <div className="formInput">
          <label>Name: {props.obj.name}</label>
        </div>
        <div className="formInput">
          <label>Email: {props.obj.email}</label>
        </div>
        <div className="formInput">
          <label>Institution: {props.obj.institution}</label>
        </div>
        <button onClick={onEditHandler}>edit</button>
        <button onClick={onDeleteHandler}>delete</button>
      </div>
    </div>
  )
}

export default KeyPersonViewSection