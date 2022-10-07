import {Restore, Save} from '@mui/icons-material';
import {
    AlertTitle,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel, LinearProgress,
    MenuItem,
    Paper,
    Select
} from '@mui/material';
import React from 'react';
import {useState} from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';

import './backup.scss';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";

const Backup = () => {

    const [databaseName, setDatabaseName] = useState('');
    const [isBackupLoading, setIsBackupLoading] = useState(false);
    const [isRestoreLoading, setIsRestoreLoading] = useState(false);
    const [backupCode, setBackupCode] = useState(0);
    const [restoreCode, setRestoreCode] = useState(false);
    const [showBackupMsg, setShowBackupMsg] = useState(false);
    const [showRestoreMsg, setShowRestoreMsg] = useState(false);

    const date1 = new Date("2022", "01", "01");
    const [file, setFile] = useState();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const close = (e) => {
        setShowBackupMsg(false);
        setShowRestoreMsg(false);
    };

    const backup = (e) => {
        setIsBackupLoading(true);
        axios.get('/database_backup')
            .then(response => {
                setIsBackupLoading(false);
                setBackupCode(JSON.stringify(response.data));
                if (backupCode == 0) {
                    // alert("Database backup success!")
                    setBackupCode(true);
                } else {
                    // alert("Database backup failed.")
                    setBackupCode(false);
                }
                setShowBackupMsg(true);
            })
            .catch(error => {
                console.log("ERROR:: ", error.response.data);
            });
    };

    const restore = (e) => {
        setIsRestoreLoading(true);
        axios.get('database_restore')
            .then(response => {
                setIsRestoreLoading(false);
                if (JSON.stringify(response.data) == 0) {
                    // alert("Database restore success!")
                    setRestoreCode(true);
                } else {
                    // alert("Database restore failed.")
                    setRestoreCode(false);
                }
                setShowRestoreMsg(true);
            })
            // .then(data => console.log(data))
            .catch(error => {
                // console.log("ERROR:: ", error.response.data);
                console.log("ERROR OCCURED")
            })
    };

    return (
        <div className="backup">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <div>
                    {(showBackupMsg == true) && (backupCode == false) &&
                        <Alert severity="error" onClose={() => {
                            close()
                        }}>
                            <AlertTitle>Error</AlertTitle>
                            Database Backup Failed. — <strong>Please try again!</strong>
                        </Alert>}
                    {(showRestoreMsg == true) && (restoreCode == false) &&
                        <Alert severity="error" onClose={() => {
                            close()
                        }}>
                            <AlertTitle>Error</AlertTitle>
                            Database Restore Failed — <strong>Please try again!</strong>
                        </Alert>}
                    {(showBackupMsg == true) && (backupCode == true) &&
                        <Alert severity="success" onClose={() => {
                            close()
                        }}>
                            <AlertTitle>Success</AlertTitle>
                            Database Backup Success! — <strong>check it out!</strong>
                        </Alert>}
                    {(showRestoreMsg == true) && (restoreCode == true) &&
                        <Alert severity="success" onClose={() => {
                            close()
                        }}>
                            <AlertTitle>Success</AlertTitle>
                            Database Restore Success! — <strong>check it out!</strong>
                        </Alert>}
                </div>
                <div className="backupContent">
                    <Paper elevation={2}>

                        <div className="contentTitle">
                            Database Backup
                        </div>
                        <div className="contentItem">
                            {!isBackupLoading &&
                                <Button variant="contained" color="success" startIcon={<Save/>} size="large"
                                        onClick={backup}>
                                    Save Current State
                                </Button>}
                            {isBackupLoading && <CircularProgress/>}

                        </div>
                    </Paper>
                    <Paper elevation={2}>
                        <div className="contentTitle">
                            Database Restore
                        </div>
                        <div className="contentItem">
                            {/*<FormControl sx={{m: 1, minWidth: 120}}>*/}
                            {/*    <InputLabel id="demo-simple-select-helper-label">Database</InputLabel>*/}
                            {/*    <Select*/}
                            {/*        labelId="demo-simple-select-helper-label"*/}
                            {/*        id="demo-simple-select-helper"*/}
                            {/*        // value={databaseName}*/}
                            {/*        label="Age"*/}
                            {/*        // onChange={handleChange}*/}
                            {/*    >*/}
                            {/*        <MenuItem value="2022-01-01">2022-01-01</MenuItem>*/}
                            {/*        <MenuItem value="2022-02-01">2022-02-01</MenuItem>*/}
                            {/*        <MenuItem value="2022-03-01">2022-03-01</MenuItem>*/}
                            {/*    </Select>*/}
                            {/*    <FormHelperText>Select database backup to restore</FormHelperText>*/}
                            {/*</FormControl>*/}

                            {!isRestoreLoading && <Button variant="contained" color="success" endIcon={<Restore/>}
                                                          size="large" onClick={restore}>Restore</Button>}
                            {isRestoreLoading && <CircularProgress/>}


                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default Backup;
