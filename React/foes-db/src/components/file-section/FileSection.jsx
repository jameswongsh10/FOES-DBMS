import React, { useState } from 'react';
import FileViewSection from '../file-view-section/FileViewSection';
import FileInputSection from '../section/FileInputSection';

const FileSection = (props) => {

  const [isEditing, setIsEditing] = useState(false);
  const isNew = (props.obj === null) ? true : false;

  useState(() => {
    if (props.obj === null) {
      setIsEditing(true);
    }
  }, []);

  return (
    <div className="fileSection">
      {isEditing
        ? (<FileInputSection obj={props.obj} index={props.index} attachments={props.attachments} setAttachments={props.setAttachments} setIsEditing={setIsEditing} staffID={props.staffID} isNew={isNew}/>)
        : (<FileViewSection obj={props.obj} index={props.index} attachments={props.attachments} setAttachments={props.setAttachments} setIsEditing={setIsEditing}/>)}
    </div>
  );
};

export default FileSection;