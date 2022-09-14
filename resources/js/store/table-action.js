import {useSelector} from 'react-redux';
import {tableActions} from './table-slice';
import axios from "axios";

export const fetchDatabase = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                // 'https://test-foes-default-rtdb.asia-southeast1.firebasedatabase.app/database.json'
                'http://foesdbms.test/readAllAdmin'
            );

            if (!response.ok) {
                console.log('fetching error from firebase');
                throw new Error('Could not fetch cart data!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const databaseObj = await fetchData();
            const obj = databaseObj;
            dispatch(tableActions.replaceDatabase(obj));
            // dispatch(tableActions.updateCollections(Object.keys(databaseObj)))
        } catch (error) {
            console.log('Fetching process failed');
        }
    };
};

export const deleteEntry = (collection, id) => {
    let url = '/';
    switch (collection) {
        case "Admin":
            url = '/deleteAdmin/' + id;
            break;
        case "Asset":
            url = '/addAssetColumn';
            break;
        case "Staff":
            url = '/addStaffColumn';
            break;
        case "KTP-USR":
            // code block
            break;
        case "MOU-MOA":
            // code block
            break;
        case "Mobility":
            // code block
            break;
        case "Research-Award":
            // code block
            break;
        default:
            url = '/';
            break;
    }
    return async (dispatch) => {


        /*    const deleteResponse = await fetch(

              `https://foes-3edf9-default-rtdb.asia-southeast1.firebasedatabase.app/database/${collection}/${id}.json`,
                'http://foesdbms.test/api/${url}/${id}',
              {
                method: 'DELETE'
              }
            );*/

        const deleteResponse = axios.delete(url)
            .then(response => console.log('Delete successful'))
            .catch(error => {
                console.log('error in deleting entry: ', id);
                throw new Error('Could not delete an entry!');
            });

        if (!deleteResponse.ok) {
            console.log('error in deleting entry: ', id);
            throw new Error('Could not delete an entry!');
        }


        const fetchData = async () => {
            const response = await fetch(
                //  'https://foes-3edf9-default-rtdb.asia-southeast1.firebasedatabase.app/database.json'
                'http://foesdbms.test/readAllAdmin'
            );

            if (!response.ok) {
                console.log('fetching error from firebase');
                throw new Error('Could not fetch cart data!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const databaseObj = await fetchData();
            dispatch(tableActions.replaceDatabase(databaseObj));
            // dispatch(tableActions.updateCollections(Object.keys(databaseObj)))
        } catch (error) {
            console.log('Fetching process failed');
        }

    };
};
