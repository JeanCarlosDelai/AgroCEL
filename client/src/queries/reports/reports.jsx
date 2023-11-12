import { useQuery } from 'react-query';
import customFetch from '../../utils/axios';
import { toast } from 'react-toastify';

async function getPDF(property_id) {
  const { data, error } = await customFetch.get(`/reports/pdf/${property_id}`);

  if (error) {
    toast.success(error);
  }
  return data.reportPdf;
}

export function useFetchReports(property_id) {
  return useQuery(['reports', property_id], () => getPDF(property_id));
}
