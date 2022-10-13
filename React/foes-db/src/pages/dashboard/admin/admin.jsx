import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import TableContainer from '../../../layout/table-container/TableContainer';
import './admin.scss';

const Admin = () => {

  const token = useSelector(state => state.auth.tokenId)

  const [columns, setColumns] = useState();
  const [rows, setRows] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const readAllResponse = await fetch(
        'http://127.0.0.1:8000/readAllAdmin', {
          headers: {
            Authorization : `Bearer ${token}`
          }
        }
      );

      if (!readAllResponse.ok) {
        console.log('Error fetching the data from backend');
        throw new Error('Could not fetch data!');
      }

      const data = await readAllResponse.json();

      const { ["Admin"]: collectionObj } = data;

      const getColumnResponse = await fetch(
        'http://127.0.0.1:8000/getAdminColumns', {
          headers: {
            Authorization : `Bearer ${token}`
          }
        }
      );

      const columnData = await getColumnResponse.json();
      const {["column"]: columnArr} = columnData;

      // let columnArr = [];
      // let entries = [];
      // for (let entry in collectionObj) {
      //   var { [entry]: entryObj } = collectionObj;
      //   entries.push({...entryObj, id: entry});
      //   for (let key in entryObj) {
      //     if (!columnArr.includes(key)) {
      //       columnArr.push(key);
      //     }
      //   }
      // }

      const filters = ["id", "created_at", "updated_at", "isSuperAdmin", "password"];

      setColumns(columnArr.filter((column) => !filters.includes(column)));
      setRows(collectionObj);
    };

    fetchData();
  }, [token]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {columns && <TableContainer title={'Admin'} viewCollection='Admin' columns={columns} rows={rows} setRows={setRows} deleteUrl="deleteAdmin"/>}
      </div>
    </div>
  );
};

export default Admin;
