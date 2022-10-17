import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import TableContainer from '../../../layout/table-container/TableContainer';
import URL from '../../../store/url';
import './mobility.scss';

const Mobility = () => {

  const token = useSelector(state => state.auth.tokenId)
  const [columns, setColumns] = useState();
  const [rows, setRows] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${URL}/readAllMobility`, { 
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

      const { ["Mobility"]: collectionObj } = data;

      const getColumnResponse = await fetch(
        `${URL}/getMobilityColumns`, { 
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
        {columns && <TableContainer title={'Mobility'} viewCollection='Mobility' columns={columns} rows={rows} setRows={setRows} deleteUrl="deleteMobility"/>}
      </div>
    </div>
  );
};

export default Mobility;