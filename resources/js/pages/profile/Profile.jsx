import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './profile.scss';

const Profile = () => {
  return (
    <div className="profile">
    <Sidebar />
    <div className="homeContainer">
      <Navbar />
      Profile
      <p>(To Be Implement)</p>
    </div>
  </div>
  )
}

export default Profile