import styled from 'styled-components';

const Wrapper = styled.nav`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -2px 10px 0px;
  background-color: #9ce096;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 2em;

  #nav-links {
    display: flex;
    align-items: center;
  }

  #nav-links li {
    margin-right: 1em;
  }

  #nav-links span {
    cursor: pointer;
  }

  #nav-links svg {
    font-size: 1.5em;
  }

  img {
    padding: 0;
  }
`;
export default Wrapper;
