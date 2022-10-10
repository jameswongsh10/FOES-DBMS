import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

const CreateDialog = (props) => {

  const navigate = useNavigate();
  const [input, setInput] = React.useState('');

  const onChangeHandler = (event) => {
    setInput(event.target.value);
    console.log(event.target.value);
  }

  const buttonClickHandler = () => {
    props.onCreateHandler(input);
    // navigate(`/${input}`)
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the new database to be created.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Database Name"
            type="type"
            fullWidth
            variant="standard"
            onChange={onChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={buttonClickHandler}>Create Database</Button>
        </DialogActions>
      </Dialog>
  )
}

export default CreateDialog