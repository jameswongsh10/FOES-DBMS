import { createSlice } from '@reduxjs/toolkit';

const initialTableState = {
  view: 'Admin',
  database: {},
  columns: [],
  entries: [],
  customColumns: [],
  singleID: '',
  sidebarCollections: [],
};

const tableSlice = createSlice({
  name: 'table',
  initialState: initialTableState,
  reducers: {
    changeView(state, action) {
      state.view = action.payload;

      const { [state.view]: collectionObj } = state.database;

      let columnArr = [];
      let entries = [];
      for (let entry in collectionObj) {
        var { [entry]: entryObj } = collectionObj;
        entries.push({...entryObj, id: entry});
        for (let key in entryObj) {
          if (!columnArr.includes(key)) {
            columnArr.push(key);
          }
        }
      }
      state.columns = columnArr;
      state.customColumns = columnArr;
      state.entries = entries;
    },
    replaceDatabase(state, action) {
      state.database = action.payload;

      const { [state.view]: collectionObj } = action.payload;
      let columnArr = [];
      let entries = [];
      for (let entry in collectionObj) {
        var { [entry]: entryObj } = collectionObj;
        entries.push({...entryObj, id: entry});
        for (let key in entryObj) {
          if (!columnArr.includes(key)) {
            columnArr.push(key);
          }
        }
      }
      state.columns = columnArr;
      state.customColumns = columnArr;
      state.entries = entries;

      let sideCollections = [];
      for (const key in action.payload) {
        sideCollections.push(key);
      }
      state.sidebarCollections = sideCollections;

    },
    addCustomColumn(state, action) {
      state.customColumns.push(action.payload);
    },
    selectSingle(state, action) {
      state.singleID = action.payload;
    },
    addSidebarCollection(state, action) {
      state.sidebarCollections.push(action.payload);
    }
  },
});

export const tableActions = tableSlice.actions;
export default tableSlice.reducer;
