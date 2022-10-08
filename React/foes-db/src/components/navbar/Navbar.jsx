import './navbar.scss';
import {
  SearchOutlined,
  FullscreenExitOutlined,
  NotificationsNoneOutlined,
  ChatBubbleOutlineOutlined,
  ListOutlined,
} from '@mui/icons-material';
import avatarImage from '../../assets/avatar/julian-wan-WNoLnJo7tS8-unsplash.jpg';
import MaterialUISwitch from '../mui-switch/MaterialUISwitch';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const Navbar = () => {

  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.ui.isDarkMode);

  const onToggleHandler = () => {
    dispatch(uiActions.toggleDarkMode());
  };

  return (
    <div className='navbar'>
      <div className="wrapper">
        {/* <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlined />
        </div> */}
        <div className="items">
          {/* <div className="item">
            <FullscreenExitOutlined className='icon' />
          </div>
          <div className="item">
            <NotificationsNoneOutlined className='icon' />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlined className='icon' />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ListOutlined className='icon' />
          </div> */}
          <div className="item">
            <MaterialUISwitch sx={{ m: 1 }} checked={isDarkMode} onClick={onToggleHandler} />
          </div>
          <div className="item">
            <img
              src={avatarImage}
              alt=""
              className='avatar'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;