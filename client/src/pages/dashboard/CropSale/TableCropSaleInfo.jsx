import React from 'react';
import FormatDate from '../../../utils/FormatDate';
import { TableRow } from '../../../components/areas/areasInfoPage/TableRow';

function TableCropSaleInfo({ cropSale }) {
  const discharge_date_format = FormatDate(cropSale?.data?.discharge_date);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left text-gray-200  ">
        <tbody>
          <TableRow label="Nome da venda" value={cropSale?.data?.name} />
          <TableRow
            label="Entidade Compradora"
            value={cropSale?.data?.purchasing_entity}
          />
          <TableRow
            label="CNPJ Entidade Compradora"
            value={cropSale?.data?.purchasing_entity_cnpj}
          />
          <TableRow label="Grau" value={cropSale?.data?.graduation + 'º'} />
          <TableRow
            label="Valor de Venda"
            value={'R$: ' + cropSale?.data?.price}
          />
          <TableRow label="Data da descarga" value={discharge_date_format} />
          <TableRow
            label="Quantidade vendida"
            value={cropSale?.data?.quantity + ' Kg'}
          />
        </tbody>
      </table>
    </div>
  );
}

export default TableCropSaleInfo;
