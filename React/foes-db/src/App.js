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
import Admin from './pages/dashboard/admin/admin';
import Staff from './pages/dashboard/staff/staff';
import AdminAddNew from './pages/add-new/AdminAddNew/AdminAddNew';
import Asset from './pages/dashboard/asset/asset';
import ResearchAward from './pages/dashboard/research-award/researchAward';
import MouMoa from './pages/dashboard/mou-moa/mouMoa';
import KtpUsr from './pages/dashboard/ktp-usr/ktpUsr';
import Mobility from './pages/dashboard/mobility/mobility';
import StaffAddNew from './pages/add-new/StaffAddNew/StaffAddNew';
import AssetAddNew from './pages/add-new/AssetAddNew/AssetAddNew';
import ResearchAwardAddNew from './pages/add-new/ResearchAwardAddNew/ResearchAwardAddNew';
import MouMoaAddNew from './pages/add-new/MouMoaAddNew/MouMoaAddNew';
import KtpUsrAddNew from './pages/add-new/KtpUsrAddNew/KtpUsrAddNew';
import MobilityAddNew from './pages/add-new/MobilityAddNew/MobilityAddNew';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isDarkMode = useSelector(state => state.ui.isDarkMode);

  const storedToken = localStorage.getItem('token');
  
  useEffect(() => {
    if (storedToken) {
      dispatch(authActions.login(storedToken));
    }
  }, [storedToken, dispatch])

  return (
    <div className={isDarkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          {isLoggedIn && <Route path='/' element={<Admin />} />}
          {isLoggedIn && <Route path='/admin' element={<Admin />} />}
          {isLoggedIn && <Route path='/admin/new' element={<AdminAddNew />} />}

          {isLoggedIn && <Route path='/staff' element={<Staff />} />}
          {isLoggedIn && <Route path='/staff/new' element={<StaffAddNew />} />}

          {isLoggedIn && <Route path='/asset' element={<Asset />} />}
          {isLoggedIn && <Route path='/asset/new' element={<AssetAddNew />} />}

          {isLoggedIn && <Route path='/research-award' element={<ResearchAward />} />}
          {isLoggedIn && <Route path='/research-award/new' element={<ResearchAwardAddNew />} />}

          {isLoggedIn && <Route path='/mou-moa' element={<MouMoa />} />}
          {isLoggedIn && <Route path='/mou-moa/new' element={<MouMoaAddNew />} />}

          {isLoggedIn && <Route path='/ktp-usr' element={<KtpUsr />} />}
          {isLoggedIn && <Route path='/ktp-usr/new' element={<KtpUsrAddNew />} />}

          {isLoggedIn && <Route path='/mobility' element={<Mobility />} />}
          {isLoggedIn && <Route path='/mobility/new' element={<MobilityAddNew />} />}

          {isLoggedIn && <Route path='/backup' element={<Backup />} />}
          {isLoggedIn && <Route path='/pdf' element={<Pdf />} />}
          {isLoggedIn && <Route path='/settings' element={<Setting />} />}
          {isLoggedIn && <Route path='/profile' element={<Profile />} />}
          {!isLoggedIn && <Route path='/' element={<Login />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );

  // return (
  //   <div className={isDarkMode ? 'app dark' : 'app'}>
  //     <BrowserRouter>
  //       <Routes>
  //         {isLoggedIn && <Route path='/' element={<Home />} />}
  //         {isLoggedIn && routeList}
  //         {isLoggedIn && <Route path='/backup' element={<Backup />} /> }
  //         {isLoggedIn && <Route path='/pdf' element={<Pdf />} /> }
  //         {isLoggedIn && <Route path='/settings' element={<Setting />} /> }
  //         {isLoggedIn && <Route path='/profile' element={<Profile />} /> }
  //         {!isLoggedIn && <Route path='/' element={<Login />} />}
  //         <Route path='*' element={<Navigate to="/" />} />
  //       </Routes>
  //     </BrowserRouter>
  //   </div>
  // );
}

export default App;
