import { useDispatch, useSelector } from 'react-redux';
import { clearStore } from '../features/user/userSlice';
import { Link } from 'react-router-dom';
import { Avatar, Dropdown } from 'flowbite-react';

const DropDown = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <div className="flex md:order-2 mr-8 mt-10">
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
    </div>
  );
};

export default DropDown;
