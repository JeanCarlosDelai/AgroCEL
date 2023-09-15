import styled from 'styled-components';

const Wrapper = styled.footer`
  width: 100%;
  height: 300px;
  background-color: #9ce096;
  text-align: left;
  padding-top: 80px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -2px 10px 0px;
  position: relative;
  z-index: 1001;

  .footer a {
    text-decoration: none;
  }

  .foo-left {
    float: left;
    width: 10%;
    height: 200px;
  }

  .foo-left img {
    width: 100px;
  }

  .foo-center {
    float: left;
    width: 40%;
    height: 150px;
  }

  .foo-center a {
    font-size: 20px;
    color: #666;
    margin-right: 5px;
  }

  .foo-center h1,
  .foo-right h1 {
    font-size: 22px;
    font-family: 'Montserrat-Bold', sans-serif;
    color: #05740c;
  }

  .foo-center p,
  .foo-right p {
    font-size: 18px;
    color: #888;
  }

  .foo-right {
    float: right;
    width: 25%;
    height: 150px;
  }

  .foo-right a {
    font-size: 25px;
    color: #666;
    margin-right: 5px;
  }

  .foo-right a:hover,
  .foo-center a:hover {
    color: #05740c;
  }

  .foo-bottom {
    display: inline-block;
    width: 100%;
    height: 60px;
    border-top: 1px solid #333;
  }

  .foo-bottom p {
    float: left;
    color: #666;
    font-size: 15px;
  }

  .contatos-top {
    width: 100%;
    height: 500px;
    background: url(../img/contatos.jpg) no-repeat top right;
    background-size: 100%;
    text-align: left;
    padding-top: 150px;
  }

  .contatos-top h1 {
    font-size: 50px;
    font-family: 'Montserrat-Bold', sans-serif;
    color: #05740c;
  }

  .contatos {
    width: 100%;
    height: auto;
    background: #05740c;
  }

  .map {
    width: 100%;
    height: 500px;
  }

  @media screen and (min-width: 2500px) {
    .barra {
      display: none;
    }
    .banner h1 {
      font-size: 80px;
    }
  }

  @media screen and (max-width: 1280px) {
    .barra {
      height: 220px;
      margin-top: -350px;
    }
    .barraimg {
      margin-top: -120px;
    }
    .banner h1 {
      line-height: 50px;
    }
    .sol-p {
      width: 70%;
      padding: 10px 0px;
      margin: 0 auto;
    }
  }

  @media screen and (max-width: 1024px) {
    .center {
      width: 80%;
    }
    .sob,
    .video {
      height: 650px;
    }
    .barra {
      height: 100px;
      margin-top: -150px;
    }
    .barraimg {
      margin-top: -10px;
    }
    .job {
      height: auto;
      padding: 60px 0px 50px 0px;
    }
    .job span,
    .job-txt {
      width: 100%;
    }
    .tec-box-p,
    .tec-box-text {
      font-size: 10px;
    }
    .tec-box {
      height: auto;
      padding: 0px 0px 20px 0px;
    }
  }

  @media screen and (max-width: 800px) {
    .sob {
      height: 450px;
    }
    .video {
      height: 450px;
    }
    .banner {
      padding-top: 15vh;
    }
    .banner h1 {
      font-size: 30px;
      line-height: 30px;
    }
    .banner p {
      font-size: 20px;
      line-height: 20px;
    }
    .barra {
      height: 70px;
      margin-top: -80px;
    }
  }

  @media screen and (max-width: 600px) {
    .top-left img,
    .top-fixo .top-left img {
      width: 70px;
      margin-top: 10px;
    }
    .links > a {
      padding: 0 5px;
      font-size: 8px;
    }
    .top-right {
      margin-top: 5px;
    }
    .top {
      height: 40px;
      background: #222;
    }
    .banner {
      height: auto;
      padding-bottom: 50px;
      background: #222;
      padding-top: 10vh;
    }
    .barra {
      display: none;
    }
    .sob {
      height: auto;
    }
    .video {
      display: none;
    }
    .solucoes h1 {
      font-size: 30px;
      line-height: 30px;
    }
    .sol-box {
      width: 90%;
    }
    .tecnologia {
      padding: 80px 0px 50px 0px;
    }
    .tec-bottom-img img {
      display: none;
    }
    .tecnologia h1 {
      font-size: 30px;
      line-height: 30px;
    }
    .tec-p {
      margin: 10px;
    }
    .tec-box {
      width: 70%;
    }
    .job-btn {
      font-size: 12px;
      width: 200px;
    }
    .footer {
      height: auto;
    }
    .foo-left,
    .foo-center,
    .foo-right {
      width: 100%;
      text-align: center;
      height: auto;
    }
    .foo-bottom {
      display: block;
      height: 80px;
    }
  }
`;
export default Wrapper;
