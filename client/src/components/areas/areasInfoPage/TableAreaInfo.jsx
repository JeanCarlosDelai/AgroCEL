import React from 'react';
import { TableRow } from './TableRow';

function TableAreainfo({ area }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left text-gray-200  ">
        <tbody>
          <TableRow label="Espécie plantada" value={area?.data?.species} />
          <TableRow label="Variedade plantada" value={area?.data?.variety} />
          <TableRow
            label="Sistema de condução"
            value={area?.data?.driving_system}
          />
          <TableRow
            label="Tipo de porta enxerto"
            value={area?.data?.rookstock_type}
          />
          <TableRow
            label="Área cultivada"
            value={area?.data?.cultivated_area}
          />
          <TableRow
            label="Coordenadas Geográficas"
            value={area?.data?.geographic_coordinates}
          />
          <TableRow
            label="Data de implantação"
            value={area?.data?.implementation_date}
          />
          <TableRow
            label="Número de fileiras"
            value={area?.data?.number_rows}
          />
          <TableRow
            label="Distância entre fileiras"
            value={area?.data?.distance_between_rows}
          />
          <TableRow
            label="Distância entre plantas"
            value={area?.data?.distance_between_plants}
          />
          <TableRow
            label="Número de plantas"
            value={area?.data?.number_plants}
          />
        </tbody>
      </table>
    </div>
  );
}

export default TableAreainfo;
