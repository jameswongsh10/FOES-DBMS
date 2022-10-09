import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import TableContainer from '../../../layout/table-container/TableContainer';
import './asset.scss';

const Asset = () => {

  const token = useSelector(state => state.auth.tokenId)
  const [columns, setColumns] = useState();
  const [rows, setRows] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'http://127.0.0.1:8000/readAllAsset', { 
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

      const { ["Asset"]: collectionObj } = data;

      const getColumnResponse = await fetch(
        'http://127.0.0.1:8000/getAssetColumns', { 
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
        {columns && <TableContainer title={'Asset'} viewCollection='Asset' columns={columns} rows={rows} setRows={setRows} deleteUrl="deleteAsset"/>}
      </div>
    </div>
  );
};

export default Asset;