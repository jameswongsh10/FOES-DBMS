import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ResearchAwardsSection = (props) => {

  const token = useSelector(state => state.auth.tokenId)
  const [awardArr, setAwardArr] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getAwards/staff/${props.staffId}`, { 
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const { awards } = data;
        setAwardArr(awards);
      });
  }, [props.staffId, token]);

  console.log(awardArr);

  const generateHtml = (arr) => {
    let sectionHtml = [];
    for (var i = 0; i < arr.length; i++) {
      sectionHtml.push(
        <div className="single-award">
          <label>Type of Grant : {awardArr[i].type_of_grant}</label>
          <label>Project Title : {awardArr[i].project_title}</label>
        </div>
      );
    }
    return sectionHtml;
  };

  const generatedHTML = generateHtml(awardArr);

  return (
    <div className="research-awards-section">
      {generatedHTML}
    </div>
  );
};

export default ResearchAwardsSection;
