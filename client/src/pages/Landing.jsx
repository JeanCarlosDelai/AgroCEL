import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Landing = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <div className="container page">
          {/* info */}
          <div className="info">
            <h4>Caderno de campo digital</h4>
            <Link to="/register" className="btn btn-hero">
              Login/Registrar-se
            </Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </Wrapper>
    </>
  );
};

export default Landing;
