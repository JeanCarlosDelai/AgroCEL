import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Footer from '../components/sharedLayout/Footer';

const Error = () => {
  return (
    <>
      <div className=" text-gray-300 ">
        <img src={img} alt="not found" className="mx-auto" />
        <h3>Ohh! Página não encontrada</h3>
        <p>
          Parece que não conseguimos encontrar a página que você está procurando
        </p>
        <Link to="/">
          <p className="block mt-4 hover:text-blue-700 text-blue-500 ">
            Voltar para a home
          </p>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Error;
