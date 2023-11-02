import { Outlet } from 'react-router-dom';
import { SidebarDashboard, SelectedProperty, DropDown } from '../../components';
const SharedLayout = () => {
  return (
    <>
      <main className="dashboard bg-gray-400 flex">
        <SidebarDashboard />
        <div className="flex-1 mx-4 mt-4">
          <SelectedProperty />
          <Outlet />
        </div>
        <div>
          <DropDown />
        </div>
      </main>
    </>
  );
};
export default SharedLayout;
