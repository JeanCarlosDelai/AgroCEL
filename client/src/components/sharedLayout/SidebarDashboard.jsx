import { HiMenuAlt3 } from 'react-icons/hi';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo/Logo';
import { links } from '../../utils/links';

const SidebarDashboard = () => {
  const [open, setOpen] = useState(true);

  let linksUser = links();

  return (
    <section className="bg-black/90">
      <div
        className={`bg-black min-h-screen  ${
          open ? 'w-64' : 'w-16'
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex flex-wrap">
          <div className={` ${!open ? 'hidden' : 'p-2'}`}>
            <Logo />
          </div>
          <div className={` flex p-2 ${open ? 'mt-8 ml-4' : 'mx-auto'}`}>
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 relative">
          {linksUser?.map((menu, i) => (
            <Link
              to={menu?.path}
              key={i}
              className={` ${
                menu?.margin && 'mt-5'
              } group flex items-center text-sm   gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: '20' })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && 'opacity-0 translate-x-28 overflow-hidden'
                }`}
              >
                {menu?.text}
              </h2>
              <h2
                className={`${
                  open && 'hidden'
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.text}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default SidebarDashboard;
