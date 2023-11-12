// App.js
import React, { useState } from 'react';
import { useFetchReports } from '../../../queries/reports/reports';
import PdfViewer from '../../../components/limbo/PdfViewer';
import usePropertyStore from '../../../store/propertys/usePropertyStore';

const ReportsContainer = () => {
  const selectedProperty = usePropertyStore((state) => state.selectedProperty);

  const property_id = selectedProperty.property_id;

  const {
    data: reportPdf,
    isError,
    error,
    isLoading,
  } = useFetchReports(property_id);

  if (isError) {
    // Tratar erros, por exemplo, exibindo uma mensagem de erro
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    // Aguardando os dados serem carregados

    return <div>Carregando...</div>;
  }

  return (
    <div>
      <PdfViewer base64String={reportPdf} />
    </div>
  );
};

export default ReportsContainer;
