import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import TableContainer from '../../../layout/table-container/TableContainer';
import URL from '../../../store/url';
import './ktpUsr.scss';

const KtpUsr = () => {

  const token = useSelector(state => state.auth.tokenId)
  const [columns, setColumns] = useState();
  const [rows, setRows] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${URL}/readAllKTPUSR`, { 
          headers: {
            Authorization : `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        console.log('Error fetching the data from backend');
        throw new Error('Could not fetch data!');
      }

      const data = await response.json();

      const { ["ktpusr"]: collectionObj } = data;
      
      const getColumnResponse = await fetch(
        `${URL}/getKTPUSRColumns`, { 
          headers: {
            Authorization : `Bearer ${token}`
          }
        }
      );

      const columnData = await getColumnResponse.json();
      const {["column"]: columnArr} = columnData;

      const filters = ["id", "created_at", "updated_at"];

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
        {columns && <TableContainer title={'KTP-USR'} viewCollection='KTPUSR' columns={columns} rows={rows} setRows={setRows} deleteUrl="deleteKTPUSR"/>}
      </div>
    </div>
  );
};

export default KtpUsr;