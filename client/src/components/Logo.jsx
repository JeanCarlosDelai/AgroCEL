import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.svg';

const Logo = () => {
  return (
    <div className="flex text-teal-800 font-bold text-xl ml-12">
      <Link to="/">
        <img className="w-20 h-20" src={logo} alt="" />
      </Link>
    </div>
  );
};

export default Logo;
