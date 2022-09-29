import { useState } from 'react';
import { useEffect } from 'react';

import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import TableContainer from '../../../layout/table-container/TableContainer';
import './admin.scss';

const Admin = () => {

  const [columns, setColumns] = useState();
  const [rows, setRows] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const readAllResponse = await fetch(
        'http://127.0.0.1:8000/readAllAdmin'
      );

      if (!readAllResponse.ok) {
        console.log('Error fetching the data from backend');
        throw new Error('Could not fetch data!');
      }

      const data = await readAllResponse.json();

      const { ["Admin"]: collectionObj } = data;
      console.log(collectionObj);

      let columnArr = [];
      let entries = [];
      for (let entry in collectionObj) {
        var { [entry]: entryObj } = collectionObj;
        entries.push({...entryObj, id: entry});
        for (let key in entryObj) {
          if (!columnArr.includes(key)) {
            columnArr.push(key);
          }
        }
      }

      setColumns(columnArr);
      setRows(entries);
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {columns && <TableContainer title={'Admin'} viewCollection='admin' columns={columns} rows={rows}/>}
      </div>
    </div>
  );
};

export default Admin;