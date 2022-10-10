import React, {useState} from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './import.scss';
import {AlertTitle, Button, FormControl, FormLabel, Radio, RadioGroup} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from 'axios';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";

const Import = () => {
    const [error, setError] = useState();
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

        const array = csvRows.filter(i => i.length !== 0).map(i => {
            const values = i.split(",");

            const obj = csvHeader.reduce((object, header, index) => {
                values[index] != '' ? object[header] = values[index] : object[header] = null;
                // object[header] = values[index];
                return object;
            }, {});
            return obj;
        });

        const table = document.querySelector('input[name="target_table"]:checked').value;
        const csvArray = [csvHeader, array, table];

        axios.post('http://127.0.0.1:8000/api/csvImport', JSON.stringify(csvArray)).then(response => {
            console.log(JSON.stringify(response.data));
            setError(false);
            setOpen(false);
        })
            .catch(error => {
                console.log("ERROR:: ", error.response.data);
                setError(true);
                setOpen(true);
            });

        setArray(array);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };
            fileReader.readAsText(file);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const close = (e) => {
        setError(true);
    };

    const headerKeys = Object.keys(Object.assign({}, ...array));

    return (
        <div className="setting">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                {(error == false) &&
                    <Alert severity="success" onClose={() => {
                        close()
                    }}>
                        <AlertTitle>Success</AlertTitle>
                        Data Imported Successfully! — <strong>check it in the dashboard!</strong>
                    </Alert>}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Incorrect CSV File Format"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            The format of the CSV File is incorrect. Please check it again.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>

                <div style={{textAlign: "center"}}>
                    <h1>CSV File Import</h1>
                    {/*{error && <div className="error">Error!</div>}*/}
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Choose Table to Import</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Asset"
                            name="target_table"
                        >
                            <FormControlLabel value="Asset" control={<Radio/>} label="Assets Information"/>
                            <FormControlLabel value="Staff" control={<Radio/>} label="Staff Information"/>
                            <FormControlLabel value="MOU-MOA" control={<Radio/>}
                                              label="MOU & MOA Program Information"/>
                            <FormControlLabel value="Inactive-MOU-MOA" control={<Radio/>}
                                              label="Inactive MOU & MOA Program Information"/>
                            <FormControlLabel value="KTP-USR" control={<Radio/>} label="KTP USR Information"/>
                            <FormControlLabel value="Mobility" control={<Radio/>} label="Mobility Information"/>
                            <FormControlLabel value="Research-Award" control={<Radio/>}
                                              label="Research Awards Information"/>
                        </RadioGroup>
                    </FormControl>
                    <form>
                        <input
                            type={"file"}
                            id={"csvFileInput"}
                            accept={".csv,.xlsx,.xls"}
                            onChange={handleOnChange}
                        />

                        <Button variant="contained"
                                onClick={(e) => {
                                    handleOnSubmit(e);
                                }}
                        >
                            IMPORT CSV
                        </Button>

                    </form>
                </div>

                <br/>
            </div>
        </div>
    );
}

export default Import
