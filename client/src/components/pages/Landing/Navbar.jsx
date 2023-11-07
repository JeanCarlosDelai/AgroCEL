import Logo from '../../logo/Logo';

const Navbar = () => {
  return (
    <nav className="bg-black border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
            <li>
              <a
                href="/login"
                className="block py-2 pl-3 pr-4  text-gray-300  rounded md:bg-transparent md:text-green-500 md:p-0 md:hover:text-gray-300"
                aria-current="page"
              >
                Login
              </a>
            </li>
            <li>
              <a
                href="/register"
                className="block py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0"
              >
                Registrar-se
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
