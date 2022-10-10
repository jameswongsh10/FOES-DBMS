import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import SingleEntry from '../../components/single-entry/SingleEntry';

import './single.scss';

const Single = () => {

  return (
    <div className="single">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="title">Update</div>
        <div className="content">
          <SingleEntry />
        </div>
      </div>
    </div>
  );
};

export default Single;