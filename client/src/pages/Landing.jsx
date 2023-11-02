import main from '../assets/images/main.svg';
import Navbar from '../components/Navbar';

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center ">
        <div className="flex ml-40">
          <h1>Caderno de campo digital</h1>
        </div>
        <div>
          <img src={main} alt="job hunt" className="ml-40" />
        </div>
      </div>
    </>
  );
};

export default Landing;
