import { Outlet } from 'react-router-dom';
import { SidebarDashboard, NavbarDashboard } from '../../components';
import Wrapper from '../../assets/wrappers/SharedLayout';
const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SidebarDashboard />
        <div>
          <NavbarDashboard />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
export default SharedLayout;
