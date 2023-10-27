import { useDispatch, useSelector } from 'react-redux';
import { clearStore } from '../features/user/userSlice';
import { Link } from 'react-router-dom';
import { getPropertyNameFromLocalStorage } from '../utils/localStorage';
import { Avatar, Button, DarkThemeToggle, Dropdown } from 'flowbite-react';
import { Navbar } from 'flowbite-react';

const NavbarDashboard = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const propertyName = getPropertyNameFromLocalStorage();

  return (
    <Navbar fluid>
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white mr-10 ml-12">
          {propertyName}
        </span>
        <DarkThemeToggle />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          // Adicionar futuramente a imagem do usuário
          label={<Avatar alt="User settings" img="" rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm">{user?.name}</span>
            <span className="block truncate text-sm font-medium">
              {user?.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>
            <Link to="/profile">Perfil</Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => dispatch(clearStore('Saindooo...'))}>
            Sair
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      {/*
       Fica pequeno dos dispositivos móveis// Aba para links
       <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
};
// <Wrapper>
//   <div className="nav-center">
//     <button type="button" className="toggle-btn" onClick={toggle}>
//       <FaAlignLeft />
//     </button>
//     <div>
//       <Logo />
//       <h3 className="logo-text">{propertyName}</h3>
//     </div>
//     <div className="btn-container">
//       <button
//         type="button"
//         className="btn"
//         onClick={() => setShowLogout(!showLogout)}
//       >
//         <FaUserCircle />
//         {user?.name}
//         <FaCaretDown />
//       </button>

//       <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
//         <button className="profile-btn">
//           <Link to="/profile">Perfil</Link>
//         </button>
//         <hr color="black" />
//         <button
//           type="button"
//           className="dropdown-btn"
//           onClick={() => dispatch(clearStore('Saindooo...'))}
//         >
//           logout
//         </button>
//         <DarkThemeToggle />
//       </div>
//     </div>
//   </div>
// </Wrapper>
//   );
// };
export default NavbarDashboard;
