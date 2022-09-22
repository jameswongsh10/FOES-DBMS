import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import TableContainer from '../../../layout/table-container/TableContainer';
import './asset.scss';

const Asset = () => {

  const [columns, setColumns] = useState();
  const [rows, setRows] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'http://127.0.0.1:8000/readAllAsset'
      );

      if (!response.ok) {
        console.log('Error fetching the data from backend');
        throw new Error('Could not fetch data!');
      }

      const data = await response.json();

      const { ["Admin"]: collectionObj } = data;
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
        {columns && <TableContainer title={'Asset'} viewCollection='asset' columns={columns} rows={rows}/>}
      </div>
    </div>
  );
};

export default Asset;