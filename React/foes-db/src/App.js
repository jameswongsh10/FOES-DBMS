import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Setting from './pages/setting/Setting';
import Profile from './pages/profile/Profile';
import Import from './pages/import/Import';

import {useDispatch, useSelector} from 'react-redux';
import './style/dark.scss';
import AddNew from './pages/add-new/AddNew';
import Single from './pages/single/Single';
import Backup from './pages/backup/Backup';
import Pdf from './pages/pdf/Pdf';
import {authActions} from './store/auth-slice';
import {useEffect} from 'react';
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
import InactiveMouMoa from './pages/dashboard/inactive-mou-moa/inactiveMouMoa';
import InactiveMouMoaAddNew from './pages/add-new/InactiveMouMoaAddNew/InactiveMouMoaAddNew';
import AdminSingle from './pages/single/admin-single/AdminSingle';
import StaffSingle from './pages/single/staff-single/StaffSingle';
import AssetSingle from './pages/single/asset-single/AssetSingle';
import ResearchAwardSingle from './pages/single/research-award-single/ResearchAwardSingle';
import MouMoaSingle from './pages/single/mou-moa-single/MouMoaSingle';
import InactiveMouMoaSingle from './pages/single/inactive-mou-moa-single/InactiveMouMoaSingle';
import KtpUsrSingle from './pages/single/ktp-usr/KtpUsrSingle';
import MobilitySingle from './pages/single/mobility-single/MobilitySingle';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isDarkMode = useSelector(state => state.ui.isDarkMode);
  const isSuperAdmin = useSelector(state => state.auth.isSuperAdmin)

  const storedToken = localStorage.getItem('token');
  const storedIsSuperUser = localStorage.getItem('isSuperAdmin');

  useEffect(() => {
    if (storedToken) {
      dispatch(authActions.login([ storedToken, storedIsSuperUser == 1 ? true : false ]));
    }
  }, [storedToken, storedIsSuperUser, dispatch])

  return (
    <div className={isDarkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          {isLoggedIn && isSuperAdmin && <Route path='/' element={<Admin />} />}
          {isLoggedIn && !isSuperAdmin && <Route path='/' element={<Staff />} />}
          {isLoggedIn && isSuperAdmin && <Route path='/admin' element={<Admin />} />}
          {isLoggedIn && isSuperAdmin && <Route path='/admin/new' element={<AdminAddNew />} />}
          {isLoggedIn && isSuperAdmin && <Route path='/admin/:id' element={<AdminSingle />} />}

          {isLoggedIn && <Route path='/staff' element={<Staff />} />}
          {isLoggedIn && <Route path='/staff/new' element={<StaffAddNew />} />}
          {isLoggedIn && <Route path='/staff/:id' element={<StaffSingle />} />}

          {isLoggedIn && <Route path='/asset' element={<Asset />} />}
          {isLoggedIn && <Route path='/asset/new' element={<AssetAddNew />} />}
          {isLoggedIn && <Route path='/asset/:id' element={<AssetSingle />} />}

          {isLoggedIn && <Route path='/awards' element={<ResearchAward />} />}
          {isLoggedIn && <Route path='/awards/new' element={<ResearchAwardAddNew />} />}
          {isLoggedIn && <Route path='/awards/:id' element={<ResearchAwardSingle />} />}

          {isLoggedIn && <Route path='/moumoa' element={<MouMoa />} />}
          {isLoggedIn && <Route path='/moumoa/new' element={<MouMoaAddNew />} />}
          {isLoggedIn && <Route path='/moumoa/:id' element={<MouMoaSingle />} />}

          {isLoggedIn && <Route path='/InactiveMOUMOA' element={<InactiveMouMoa />} />}
          {isLoggedIn && <Route path='/InactiveMOUMOA/new' element={<InactiveMouMoaAddNew />} />}
          {isLoggedIn && <Route path='/InactiveMOUMOA/:id' element={<InactiveMouMoaSingle />} />}

          {isLoggedIn && <Route path='/KTPUSR' element={<KtpUsr />} />}
          {isLoggedIn && <Route path='/KTPUSR/new' element={<KtpUsrAddNew />} />}
          {isLoggedIn && <Route path='/KTPUSR/:id' element={<KtpUsrSingle />} />}

          {isLoggedIn && <Route path='/mobility' element={<Mobility />} />}
          {isLoggedIn && <Route path='/mobility/new' element={<MobilityAddNew />} />}
          {isLoggedIn && <Route path='/mobility/:id' element={<MobilitySingle />} />}

                    {isLoggedIn && <Route path='/backup' element={<Backup/>}/>}
                    {isLoggedIn && <Route path='/pdf' element={<Pdf/>}/>}
                    {isLoggedIn && <Route path='/import' element={<Import/>}/>}
                    {isLoggedIn && <Route path='/settings' element={<Setting/>}/>}
                    {isLoggedIn && <Route path='/profile' element={<Profile/>}/>}
                    {!isLoggedIn && <Route path='/' element={<Login/>}/>}
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
    //         {isLoggedIn && <Route path='/settings' element={<Import />} /> }
    //         {isLoggedIn && <Route path='/profile' element={<Profile />} /> }
    //         {!isLoggedIn && <Route path='/' element={<Login />} />}
    //         <Route path='*' element={<Navigate to="/" />} />
    //       </Routes>
    //     </BrowserRouter>
    //   </div>
    // );
}

export default App;
