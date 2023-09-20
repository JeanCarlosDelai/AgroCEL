import styled from 'styled-components';

const AreaInfo = styled.div`
  padding: 20px;
  font-size: 16px;
  font-family: Arial, sans-serif;

  h2 {
    color: #000000; /* Verde */
    margin-bottom: 20px;
  }
  .area-atividaes-info {
    margin-top: 10px;
  }
  .table-area-info {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #009900;

    tr:nth-child(odd) {
      background-color: #e0e0e0; /* Cinza claro */
    }

    tr:nth-child(even) {
      background-color: #009900; /* Verde */
    }

    td {
      padding: 10px;
    }

    p {
      margin: 0;
    }
  }
`;

export default AreaInfo;
