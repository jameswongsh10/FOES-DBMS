import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './pdf.scss';

const Pdf = () => {
  return (
    <div className="pdf">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <p>PDF</p>
        <p>(To Be Implement)</p>
      </div>
    </div>
  );
};

export default Pdf;