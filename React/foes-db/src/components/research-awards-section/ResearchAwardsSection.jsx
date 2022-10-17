import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import URL from '../../store/url';
import './researchAwardsSection.scss'

const ResearchAwardsSection = (props) => {

  const token = useSelector(state => state.auth.tokenId)
  const [awardArr, setAwardArr] = useState([]);

  useEffect(() => {
    fetch(`${URL}/api/getAwards/staff/${props.staffId}`, {
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

  const generateHtml = (arr) => {
    let sectionHtml = [];
    for (var i = 0; i < arr.length; i++) {
      sectionHtml.push(
        <div className="single-award">
          <div className="award-text">Type of Grant : {awardArr[i].type_of_grant} </div>
          <div className="award-text">Project Title : {awardArr[i].project_title} </div>
          {/* <div>Type of Grant : {awardArr[i].type_of_grant}</div> */}
          {/* <div>Project Title : {awardArr[i].project_title}</div> */}
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
