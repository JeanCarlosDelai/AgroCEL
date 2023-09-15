// import './Footer.css';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/Footer';

const Footer = () => {
  return (
    <Wrapper>
      <div className="footer">
        <div className="center">
          <div className="foo-left">
            <Logo />
          </div>
          <div className="foo-center">
            <h1>AgroCEL</h1>
            <p>Caderno de campo digital</p>
            <p>Coronel Pilar - RS</p>
          </div>
          <div className="foo-right">
            <h1>Contatos</h1>
            <p>
              <span className="icon-phone"></span>(54) 99905 8249
            </p>
            <a href="mailto:jean_outlook.com?subject=Contato">
              <span className="icon-mail"></span>
            </a>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Footer;
