import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tableActions } from '../../store/table-slice';

import { Transform, SettingsApplicationsOutlined, AccountCircleOutlined, ExitToAppOutlined, HomeWorkOutlined, BadgeOutlined, SupervisorAccountOutlined, WorkspacePremiumOutlined, LocationCityOutlined, FolderOutlined, OutputOutlined, BackupOutlined, EqualizerOutlined, AddBox, Badge, SupervisorAccount, HomeWork, WorkspacePremium, LocationCity, Equalizer, Folder, Backup, SettingsApplications, AccountCircle, InputOutlined } from '@mui/icons-material';
import { uiActions } from '../../store/ui-slice';

import './sidebar.scss';
import { useState } from 'react';
import CreateDialog from '../create-dialog/CreateDialog';
import { authActions } from '../../store/auth-slice';

const Sidebar = () => {

  const dispatch = useDispatch();

  const sidebarCollections = useSelector(state => state.table.sidebarCollections);

  const linkClickHandler = (title) => {
    localStorage.setItem('viewCollection', title);
    dispatch(tableActions.changeView(title));
  };

  const darkModeHandler = () => {
    dispatch(uiActions.setDarkMode());
  };

  const lightModeHandler = () => {
    dispatch(uiActions.setLightMode());
  };

  // const column = Object.keys(useSelector(state => state.table.database));

  const getIcon = (iconName) => {
    // switch (iconName) {
    //   case 'Admin':
    //     return <BadgeOutlined className='icon' />;
    //   case 'Staff':
    //     return <SupervisorAccountOutlined className='icon' />;
    //   case 'Asset':
    //     return <HomeWorkOutlined className='icon' />;
    //   case 'Research-Award':
    //     return <WorkspacePremiumOutlined className='icon' />;
    //   case 'MOU-MOA':
    //     return <LocationCityOutlined className='icon' />;
    //   case 'KTP-USR':
    //     return <EqualizerOutlined className='icon' />;
    //   case 'Mobility':
    //     return <Transform className='icon' />;
    //   default:
    //     return <FolderOutlined className='icon' />;
    // }
    switch (iconName) {
      case 'Admin':
        return <Badge className='icon' />;
      case 'Staff':
        return <SupervisorAccount className='icon' />;
      case 'Asset':
        return <HomeWork className='icon' />;
      case 'Research-Award':
        return <WorkspacePremium className='icon' />;
      case 'MOU-MOA':
        return <LocationCity className='icon' />;
      case 'KTP-USR':
        return <Equalizer className='icon' />;
      case 'Mobility':
        return <Transform className='icon' />;
      default:
        return <FolderOutlined className='icon' />;
    }
  };

  // let links = [];

  // for (const key in database) {
  //   const component = (
  //     <Link to={`/${key}`} key={key} className='link'>
  //       <li key={key} onClick={() => linkClickHandler(key)}>
  //         {getIcon(key)}
  //         <span>{key}</span>
  //       </li>
  //     </Link>
  //   );
  //   links.push(component)
  // }

  const links = sidebarCollections.map(el => {
    return (
      <Link to={`/${el}`} key={el} className='link'>
        <li key={el} onClick={() => linkClickHandler(el)}>
          {getIcon(el)}
          <span>{el}</span>
        </li>
      </Link>
    );
  });

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const [open, setOpen] = useState(false);

  const openDialogHandler = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCreateHandler = (name) => {
    dispatch(tableActions.addSidebarCollection(name));
    setOpen(false)
  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link to='/' className='link'>
          <span className='logo'>FoES DB</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {/* <p className='title'>MAIN</p>
          <Link to='/' className='link'>
            <li>
              <Dashboard className='icon' />
              <span>Dashboard</span>
            </li
          </Link> */}
          <p className="title">DATABASE</p>
          {links}
          <p className='title'>FEATURES</p>
          <li onClick={openDialogHandler}>
            <AddBox className='icon' />
            <span>Create Database</span>
          </li>
          <CreateDialog open={open} handleClose={handleClose} onCreateHandler={onCreateHandler}/>
          <Link to='/import' className='link'>
            <li>
              <InputOutlined className='icon' />
              <span>Data Import</span>
            </li>
          </Link>
          <Link to='/pdf' className='link'>
            <li>
              <OutputOutlined className='icon' />
              <span>Generate PDF</span>
            </li>
          </Link>
          <Link to='/backup' className='link'>
            <li>
              <Backup className='icon' />
              <span>Backup & Restore</span>
            </li>
          </Link>
          <p className='title'>USER</p>
          <Link to='/settings' className='link'>
            <li>
              <SettingsApplicationsOutlined className='icon' />
              <span>Settings</span>
            </li>
          </Link>
          <Link to='/profile' className='link'>
            <li>
              <AccountCircle className='icon' />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={logoutHandler}>
            <ExitToAppOutlined className='icon' />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={lightModeHandler}></div>
        <div className="colorOption" onClick={darkModeHandler}></div>
      </div>
    </div>
  );
};

export default Sidebar;