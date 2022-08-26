import { useSelector } from 'react-redux';
import { tableActions } from './table-slice';
import axios from "axios";

export const fetchDatabase = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://test-foes-default-rtdb.asia-southeast1.firebasedatabase.app/database.json'
      );

      if (!response.ok) {
        console.log('fetching error from firebase');
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

        axios.get('/fetchAdminTable')
            .then(response => {
                console.log(JSON.stringify(response.data));
            })
            .catch(error => {
                console.log("ERROR:: ", error.response.data);
            })

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

export const deleteEntry = (collection, id) => {
  return async (dispatch) => {
    const deleteResponse = await fetch(
      `https://foes-3edf9-default-rtdb.asia-southeast1.firebasedatabase.app/database/${collection}/${id}.json`,
      {
        method: 'DELETE'
      }
    );

    if (!deleteResponse.ok) {
      console.log('error in deleting entry: ', id);
      throw new Error('Could not delete an entry!');
    }


    const fetchData = async () => {
      const response = await fetch(
        'https://foes-3edf9-default-rtdb.asia-southeast1.firebasedatabase.app/database.json'
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
