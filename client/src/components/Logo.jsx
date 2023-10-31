import logo from '../assets/images/logo.svg';

const Logo = () => {
  return (
    <div className="flex text-teal-800 font-bold text-xl ml-12">
      <img className="w-20 h-20" src={logo} alt="" />
    </div>
  );
};
export default Logo;
