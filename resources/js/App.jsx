import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Setting from './pages/setting/Setting';
import Profile from './pages/profile/Profile';

import { useDispatch, useSelector } from 'react-redux';
import './style/dark.scss';
import AddNew from './pages/add-new/AddNew';
import Single from './pages/single/Single';
import Backup from './pages/backup/Backup';
import Pdf from './pages/pdf/Pdf';
import { authActions } from './store/auth-slice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isDarkMode = useSelector(state => state.ui.isDarkMode);
  const sidebarCollections = useSelector(state => state.table.sidebarCollections);

  const storedToken = localStorage.getItem('token');
  
  useEffect(() => {
    if (storedToken) {
      dispatch(authActions.login(storedToken));
    }
  }, [storedToken, dispatch])

  const routeList = sidebarCollections.map(el => {
    return (
      <Route path={`/${el}`} key={el}>
        <Route index element={<Home />} />
        <Route path=":userId" element={<Single />} />
        <Route path='new' element={<AddNew />} />
      </Route>
    )
  })

  return (
    <div className={isDarkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          {isLoggedIn && <Route path='/' element={<Home />} />}
          {isLoggedIn && routeList}
          {isLoggedIn && <Route path='/backup' element={<Backup />} /> }
          {isLoggedIn && <Route path='/pdf' element={<Pdf />} /> }
          {isLoggedIn && <Route path='/settings' element={<Setting />} /> }
          {isLoggedIn && <Route path='/profile' element={<Profile />} /> }
          {!isLoggedIn && <Route path='/' element={<Login />} />}
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
