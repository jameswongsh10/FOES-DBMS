import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import TableContainer from '../../../layout/table-container/TableContainer';
import './staff.scss';

const Staff = () => {

  const [columns, setColumns] = useState();
  const [rows, setRows] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'http://127.0.0.1:8000/readAllStaff'
      );

      if (!response.ok) {
        console.log('Error fetching the data from backend');
        throw new Error('Could not fetch data!');
      }

      const data = await response.json();

      const { ["Staff"]: collectionObj } = data;

      const getColumnResponse = await fetch(
        'http://127.0.0.1:8000/getStaffColumns'
      );

      const columnData = await getColumnResponse.json();
      const {["column"]: columnArr} = columnData;

      const filters = ["id", "created_at", "updated_at"];

      setColumns(columnArr.filter((column) => !filters.includes(column)));
      setRows(collectionObj);
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {columns && <TableContainer title={'Staff'} viewCollection="Staff" columns={columns} rows={rows} setRows={setRows} deleteUrl="deleteStaff"/>}
      </div>
    </div>
  );
};

export default Staff;