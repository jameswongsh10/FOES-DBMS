import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import { tableActions } from '../../store/table-slice';
import './dataTable.scss';

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject(new Error("Error while saving user: name can't be empty."));
          } else {
            resolve({ ...user, name: user.name });
          }
        }, 200),
      ),
    [],
  );
};

const DataTable = (props) => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.tokenId)

  const mutateRow = useFakeMutation();
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
  const viewCollection = props.viewCollection;

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      // Make the HTTP request to save in the backend
      const { id: elementID, ...newObj } = newRow;
      await fetch(
        `http://127.0.0.1:8000/api/update${viewCollection}/${elementID}`,
        {
          method: 'put',
          body: JSON.stringify(newObj),
          headers: {
            Authorization : `Bearer ${token}`
          }
        }
        );

      const response = await mutateRow(newRow);
      setSnackbar({ children: 'Successfully saved', severity: 'success' });
      return response;
    },
    [mutateRow, viewCollection, token],
  );

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const onSelectSingleHandler = (id) => {
    dispatch(tableActions.selectSingle(id));
  };

  const onDeleteEntryHandler = (deleteUrl, id) => {
    if (window.confirm("Are you sure you want to delete this element?") == true) {
      fetch(`http://127.0.0.1:8000/api/${deleteUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization : `Bearer ${token}`
        }
      })
      .then(props.setRows(props.rows.filter(item => item.id !== id)))
    }
 
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${viewCollection}/${params.row.id}`} style={{ textDecoration: "none" }} onClick={() => onSelectSingleHandler(params.row.id)}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => onDeleteEntryHandler(props.deleteUrl, params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 600, width: '100%' }} className='dataTable'>
      <DataGrid
        rows={props.rows}
        columns={props.columns.concat(actionColumn)}
        rowsPerPageOptions={[10, 25, 50, 100]}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        experimentalFeatures={{ newEditingApi: true }}
        components={{Toolbar: GridToolbar}}
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
};

export default DataTable;