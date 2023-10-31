import { useDispatch, useSelector } from 'react-redux';
import { clearStore } from '../features/user/userSlice';
import { Link } from 'react-router-dom';
import { getPropertyNameFromLocalStorage } from '../utils/localStorage';
import { Avatar, Button, Dropdown } from 'flowbite-react';
import { Navbar } from 'flowbite-react';
import Logo from './Logo';

const NavbarDashboard = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const propertyName = getPropertyNameFromLocalStorage();

  return (
    <Navbar fluid className="bg-black/90">
      <Navbar.Brand>
        <Logo />
      </Navbar.Brand>
      <Navbar.Brand>
        <span className=" text-white self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          {propertyName}
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 mr-4">
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
    </Navbar>
  );
};

export default NavbarDashboard;
