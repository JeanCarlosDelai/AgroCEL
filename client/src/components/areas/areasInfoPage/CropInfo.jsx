import React from 'react';
import { TableRow } from './TableRow';

function TableAreainfo({ crop }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left text-gray-200  ">
        <tbody>
          <TableRow label="Quantidade Colhida" value={crop?.data?.quantity} />
        </tbody>
      </table>
    </div>
  );
}

export default TableAreainfo;
