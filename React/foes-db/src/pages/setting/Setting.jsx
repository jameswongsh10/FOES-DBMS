import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './setting.scss';

const Setting = () => {
  return (
    <div className="setting">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        Settings
        <p>(To Be Implement)</p>
      </div>
    </div>
  )
}

export default Setting