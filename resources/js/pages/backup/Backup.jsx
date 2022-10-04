import {Restore, Save} from '@mui/icons-material';
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select} from '@mui/material';
import React from 'react';
import {useState} from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';

import './backup.scss';

const Backup = () => {

    const [databaseName, setDatabaseName] = useState('');

    const date1 = new Date("2022", "01", "01");
    const [file, setFile] = useState();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const backup = (e) => {
        axios.get('/database_backup').then(response => {
            console.log(JSON.stringify(response.data));
        })
            .catch(error => {
                console.log("ERROR:: ", error.response.data);
            });
    };

    const restore = (e) => {
        axios.get('database_restore')
            .then(response => {
                console.log(JSON.stringify(response.data));
            })
            .catch(error => {
                console.log("ERROR:: ", error.response.data);
            })
    };

    return (
        <div className="backup">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <div className="backupContent">
                    <Paper elevation={2}>
                        <div className="contentTitle">
                            Database Backup
                        </div>
                        <div className="contentItem">
                            <Button variant="contained" color="success" startIcon={<Save/>} size="large"
                                    onClick={backup}>
                                Save Current State
                            </Button>
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
                            <Button variant="contained" color="success" endIcon={<Restore/>}
                                    size="large" onClick={restore}>Restore</Button>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default Backup;
