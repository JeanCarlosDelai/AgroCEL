import { useQuery } from 'react-query';
import customFetch from '../../utils/axios';
import { toast } from 'react-toastify';
import queryClient from '../../services/queryClient';

async function getApplications(area_id) {
  const { data, error } = await customFetch.get(`/application/${area_id}`);
  if (error) {
    toast.success(error);
  }
  return data.data;
}

export function useFetchApplications(area_id) {
  return useQuery(['applications', area_id], () => getApplications(area_id));
}

// async function getOneArea(property_id, area_id) {
//   const { data, error } = await customFetch.get(
//     `/area/${property_id}/property/${area_id}`,
//   );
//   if (error) {
//     toast.success(error);
//   }
//   return data;
// }

// export function useFetchOneArea(property_id, area_id) {
//   return useQuery(['area', property_id, area_id], () =>
//     getOneArea(property_id, area_id),
//   );
// }

export const createApplication = async (application) => {
  try {
    await customFetch.post(`/application/${application.area_id}`, application);
    await queryClient.invalidateQueries('applications');
    toast.success('Aplicação criada com sucesso!');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const updateApplication = async (
  area_id,
  application_id,
  application,
) => {
  try {
    const response = await customFetch.put(
      `/application/${area_id}/area/${application_id}`,
      application,
    );
    await queryClient.invalidateQueries('applications');
    toast.success('Aplicação alterada com sucesso!');
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const deleteApplication = async (area_id, application_id) => {
  try {
    await customFetch.delete(`/application/${area_id}/area/${application_id}`);
    await queryClient.invalidateQueries('applications');
    toast.success('Aplicação apagada com sucesso!');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};
