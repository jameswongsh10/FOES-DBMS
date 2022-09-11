import React, {useState} from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './setting.scss';
import {Button, FormControl, FormLabel, Radio, RadioGroup} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from 'axios';

const Setting = () => {
    // const csvImport = (name) => {
    //     //Pass Data to AdminController to create admin
    //     axios.post('/csvImport', JSON.stringify(newObj))
    //         .then(response => {
    //             console.log(JSON.stringify(response.data));
    //         })
    //         .catch(error => {
    //             console.log("ERROR:: ", error.response.data);
    //         })
    //     navigate('/');
    //
    //   };
    //
    // return (
    //   <div className="setting">
    //     <Sidebar />
    //     <div className="homeContainer">
    //       <Navbar />
    //     {/*<button>CSVImport{csvImport}</button>*/}
    //     <FormControl>
    //         <FormLabel id="demo-radio-buttons-group-label">Choose Table to Import</FormLabel>
    //         <RadioGroup
    //             aria-labelledby="demo-radio-buttons-group-label"
    //             defaultValue="female"
    //             name="radio-buttons-group"
    //         >
    //             <FormControlLabel value="Admins_Information" control={<Radio />} label="Admins Information" />
    //             <FormControlLabel value="Assets_Information" control={<Radio />} label="Assets Informatio" />
    //             <FormControlLabel value="Staff_Information" control={<Radio />} label="Staff Information" />
    //             <FormControlLabel value="MOU_MOA_Program_Information" control={<Radio />} label="MOU & MOA Program Information" />
    //             <FormControlLabel value="KTP_USR_Information" control={<Radio />} label="KTP USR Information" />
    //             <FormControlLabel value="Mobility_Information" control={<Radio />} label="Mobility Information" />
    //             <FormControlLabel value="Research_Awards_Information" control={<Radio />} label="Research Awards Information" />
    //         </RadioGroup>
    //     </FormControl>
    //         <Button
    //             variant="contained"
    //             component="label"
    //         >
    //             Upload File
    //             <input
    //                 type="file"
    //                 hidden
    //             />
    //         </Button>
    //     </div>
    //   </div>
    // )

    const [file, setFile] = useState();
    const [array, setArray] = useState([]);

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

        const array = csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });

        const table = document.querySelector('input[name="target_table"]:checked').value;
        const csvArray = [csvHeader, array,table];

        axios.post('/csvImport', JSON.stringify(csvArray)).then(response => {
            console.log(JSON.stringify(response.data));
        })
            .catch(error => {
                console.log("ERROR:: ", error.response.data);
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

    const headerKeys = Object.keys(Object.assign({}, ...array));

    return (
        <div className="setting">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Choose Table to Import</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="admins"
                        name="target_table"
                    >
                        <FormControlLabel value="Admin" control={<Radio/>} label="Admins Information"/>
                        <FormControlLabel value="Asset" control={<Radio/>} label="Assets Information"/>
                        <FormControlLabel value="Staff" control={<Radio/>} label="Staff Information"/>
                        <FormControlLabel value="MouMoa" control={<Radio/>}
                                          label="MOU & MOA Program Information"/>
                        <FormControlLabel value="KtpUsr" control={<Radio/>} label="KTP USR Information"/>
                        <FormControlLabel value="Mobility" control={<Radio/>} label="Mobility Information"/>
                        <FormControlLabel value="ResearchAwards" control={<Radio/>}
                                          label="Research Awards Information"/>
                    </RadioGroup>
                </FormControl>
                <div style={{textAlign: "center"}}>
                    <h1>REACTJS CSV IMPORT EXAMPLE </h1>
                    <form>
                        <input
                            type={"file"}
                            id={"csvFileInput"}
                            accept={".csv,.xlsx,.xls"}
                            onChange={handleOnChange}
                        />

                        <button
                            onClick={(e) => {
                                handleOnSubmit(e);
                            }}
                        >
                            IMPORT CSV
                        </button>
                    </form>
                </div>

                <br/>

                <table>
                    <thead>
                    <tr key={"header"}>
                        {headerKeys.map((key) => (
                            <th>{key}</th>
                        ))}
                    </tr>
                    </thead>

                    <tbody>
                    {array.map((item) => (
                        <tr key={item.id}>
                            {Object.values(item).map((val) => (
                                <td>{val}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Setting
