import React, {useState} from 'react';
import KeyPersonInputSection from '../key-person-input-section/KeyPersonInputSection';
import KeyPersonViewSection from '../key-person-view-section/KeyPersonViewSection';

const KeyPersonSection = (props) => {

  const [isEditing, setIsEditing] = useState(false);
  const isNew = (props.obj === null) ? true : false;

  useState(() => {
    if (props.obj === null) {
      setIsEditing(true);
    }
  }, []);

  return (
    <div className="key-person-section">
      {isEditing
        ? (<KeyPersonInputSection obj={props.obj} index={props.index} keyPersons={props.keyPersons} setKeyPersons={props.setKeyPersons} setIsEditing={setIsEditing} mouID={props.mouID} isNew={isNew} />)
        : (<KeyPersonViewSection obj={props.obj} index={props.index} keyPersons={props.keyPersons} setKeyPersons={props.setKeyPersons} setIsEditing={setIsEditing} />)}
    </div>
  );
};

export default KeyPersonSection;