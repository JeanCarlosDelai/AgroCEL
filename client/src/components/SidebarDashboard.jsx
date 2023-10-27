import Logo from './Logo';
import { useSelector } from 'react-redux';
import { Sidebar } from 'flowbite-react';
import NavLinks from './NavLinks';

const SidebarDashboard = () => {
  return (
    <Sidebar className="mb-20">
      <Sidebar.Items>
        <div className="ml-12">
          <Logo />
        </div>
        <Sidebar.ItemGroup>
          <NavLinks />
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
export default SidebarDashboard;
