import React, { useState } from 'react';
import { DocInputSection } from '../doc-input-section/DocInputSection';
import DocViewSection from '../doc-view-section/DocViewSection';
// import FileViewSection from '../file-view-section/FileViewSection';
// import FileInputSection from '../section/FileInputSection';

const DocSection = (props) => {

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
      ? (<DocInputSection obj={props.obj} index={props.index} attachments={props.attachments} setAttachments={props.setAttachments} setIsEditing={setIsEditing} staffID={props.staffID} isNew={isNew} attachmentId={props.attachmentId} updateAttachmentsHTTP={props.updateAttachmentsHTTP} url={props.url}/>)
      : (<DocViewSection obj={props.obj} index={props.index} attachments={props.attachments} setAttachments={props.setAttachments} setIsEditing={setIsEditing} attachmentId={props.attachmentId} updateAttachmentsHTTP={props.updateAttachmentsHTTP} url={props.url}/>)}
  </div>
  )
}

export default DocSection