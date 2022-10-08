import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './table-slice';
import uiReducer from './ui-slice';
import authReducer from './auth-slice';

const store = configureStore({
  reducer: { table: tableReducer, ui: uiReducer, auth: authReducer }
});

export default store;