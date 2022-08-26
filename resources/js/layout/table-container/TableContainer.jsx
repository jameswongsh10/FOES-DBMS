import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataTable from '../../components/dataTable/DataTable';
import { fetchDatabase, deleteEntry } from '../../store/table-action';
import './tableContainer.scss';

const TableContainer = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDatabase());
  }, [dispatch]);

  const generateColumnArr = (arr) => {
    let columnArr = [];
    console.log(arr);

    arr.forEach((colName) => {
        console.log(colName);

      columnArr.push({ field: colName, headerName: colName, editable: true, width: '150' });
    });

    console.log(columnArr);
    return columnArr;
  };

  const viewCollection = useSelector(state => state.table.view);
  const columns = generateColumnArr(useSelector(state => state.table.columns));
  const rows = useSelector(state => state.table.entries);

//   const columns =[
//       {field: 'first_name', headerName: 'first name'},
//       {field: 'last_name', headerName: 'last name'},
//       {field: 'id', headerName: 'perth id'},
//   ];
//   const rows = [
//       {first_name: 'adam', last_name: 'snow', id: '1'},
//       {first_name: 'bob', last_name: 'snow', id: '2'},
//       {first_name: 'cindy', last_name: 'snow', id: '3'},
//       {first_name: 'dave', last_name: 'snow', id: '4'},
//       {first_name: 'evelen', last_name: 'snow', id: '5'},
//   ]

  const onDeleteEntryHandler = (collection, id) => {
    dispatch(deleteEntry(collection, id));
  };

  return (
    <div className="tableContainer">
      <div className="tableTitle">
        {props.title}
      </div>
      <div className="tableAction">
        <Button color="success" variant="contained">
          <Link to={`/${viewCollection}/new`} className="newButton">
            <p className="buttonText">Add New</p>
          </Link>
        </Button>
      </div>
      <DataTable rows={rows} columns={columns} onDeleteEntryHandler={onDeleteEntryHandler} />
    </div>
  );
};

export default TableContainer;
