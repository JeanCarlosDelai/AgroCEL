import Logo from './Logo';
import Wrapper from '../assets/wrappers/Navbar';
// Components
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Wrapper>
      <div className="nav">
        <NavLink className="toggle-btn" to="/">
          <Logo />
        </NavLink>
      </div>
    </Wrapper>
  );
};

export default Navbar;
