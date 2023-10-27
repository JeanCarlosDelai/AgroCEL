import { NavLink } from 'react-router-dom';
import { links } from '../utils/links';
import { Sidebar } from 'flowbite-react';
let linksUser = links();
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi';

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {linksUser.map((link) => {
        const { text, path, id, icon } = link;

        return (
          <Sidebar.Item href={path} key={id} onClick={toggleSidebar}>
            <div className="mt-4 mb-4" style={{ display: 'flex' }}>
              <div>{icon}</div>
              <div>
                <h6 className="ml-4">{text}</h6>
              </div>
            </div>
          </Sidebar.Item>

          // <Sidebar.Item
          //   href={path}
          //   key={id}
          //   icon={icon}
          //   onClick={toggleSidebar}
          // >
          //   <p>{text}</p>
          // </Sidebar.Item>
        );
      })}
    </div>
  );
};

{
  /* <Sidebar.Item href="#" icon={HiChartPie}>
            <p>Dashboard</p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiViewBoards}
            label="Pro"
            labelColor="dark"
          >
            <p>Kanban</p>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox} label="3">
            <p>Inbox</p>
          </Sidebar.Item> */
}

export default NavLinks;
