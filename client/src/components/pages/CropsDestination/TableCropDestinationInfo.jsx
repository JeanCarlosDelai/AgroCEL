import React from 'react';
import { TableRow } from '../../areas/areasInfoPage/TableRow';

function TableCropDestinationInfo({ cropDestination }) {
  console.log(cropDestination);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left text-gray-200  ">
        <tbody>
          <TableRow label="Nome da venda" value={cropDestination?.data?.name} />
          <TableRow
            label="Tipo de processamento"
            value={cropDestination?.data?.processing_type}
          />
          <TableRow
            label="Destinação"
            value={cropDestination?.data?.destination}
          />
          <TableRow
            label="Quantidade Processada"
            value={cropDestination?.data?.quantity + ' Kg'}
          />
        </tbody>
      </table>
    </div>
  );
}

export default TableCropDestinationInfo;
