import Wrapper from '../assets/wrappers/NavbarDashboard';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, clearStore } from '../features/user/userSlice';
import { Link } from 'react-router-dom';
import { getPropertyNameFromLocalStorage } from '../utils/localStorage';
import { DarkThemeToggle } from 'flowbite-react';

const NavbarDashboard = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const propertyName = getPropertyNameFromLocalStorage();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">{propertyName}</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button className="profile-btn">
              <Link to="/profile">Perfil</Link>
            </button>
            <hr color="black" />
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(clearStore('Saindooo...'))}
            >
              logout
            </button>
            <DarkThemeToggle />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default NavbarDashboard;
