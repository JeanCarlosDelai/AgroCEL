import main from '../assets/images/main.svg';
import { Footer } from '../components';
import Navbar from '../components/Navbar';

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center bg-gray-400">
        <div className="flex ml-40">
          <h1>Caderno de campo digital</h1>
        </div>
        <div>
          <img src={main} alt="job hunt" className="ml-40" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
