import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './setting.scss';

const Setting = () => {
  const csvImport = (name) => {
      //Pass Data to AdminController to create admin
      axios.post('/csvImport', JSON.stringify(newObj))
          .then(response => {
              console.log(JSON.stringify(response.data));
          })
          .catch(error => {
              console.log("ERROR:: ", error.response.data);
          })
      navigate('/');

    };

  return (
    <div className="setting">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        Settings
          <button>{csvImport}</button>
        <p>(To Be Implement)</p>
      </div>
    </div>
  )
}

export default Setting
