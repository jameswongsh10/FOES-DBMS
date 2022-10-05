import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataTable from '../../components/dataTable/DataTable';
import { fetchDatabase, deleteEntry } from '../../store/table-action';
import './tableContainer.scss';

const TableContainer = (props) => {

  const generateColumnArr = (arr) => {
    let columnArr = [];

    arr.forEach((colName) => {
      columnArr.push({ field: colName, headerName: colName, editable: true, width: '150' });
    });

    return columnArr;
  };

  const viewCollection = props.viewCollection;
  const title = props.title

  const columns = generateColumnArr(props.columns);
  const rows = props.rows;

  const onDeleteEntryHandler = (collection, id) => {
    // TODO: implement http DEL fetch function using collection and ID
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
      <DataTable rows={rows} columns={columns} onDeleteEntryHandler={onDeleteEntryHandler} viewCollection={viewCollection}/>
    </div>
  );
};

export default TableContainer;