import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TableContainer from '../../layout/table-container/TableContainer';
import { tableActions } from '../../store/table-slice';
import './home.scss';

const Home = () => {

  const dispatch = useDispatch();

  const viewCollection = useSelector(state => state.table.view);
  const savedCollection = localStorage.getItem('viewCollection');

  useEffect(() => {
    if (savedCollection) {
      dispatch(tableActions.changeView(savedCollection));
    }
  }, [dispatch, savedCollection]);

  let viewTable;
  if (savedCollection) {
    viewTable = savedCollection;
  } else {
    viewTable = viewCollection;
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <TableContainer title={viewTable} />
      </div>
    </div>
  );
};

export default Home;