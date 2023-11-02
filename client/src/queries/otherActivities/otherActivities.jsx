import { useQuery } from 'react-query';
import customFetch from '../../utils/axios';
import { toast } from 'react-toastify';
import queryClient from '../../services/queryClient';

async function getOtherActivities(area_id) {
  const { data, error } = await customFetch.get(`/other/${area_id}`);
  if (error) {
    toast.success(error);
  }
  return data.data;
}

export function useFetchOtherActivities(area_id) {
  return useQuery(['otherActivities', area_id], () =>
    getOtherActivities(area_id),
  );
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

export const createOtherActivitie = async (area_id, otherActivitie) => {
  try {
    await customFetch.post(`/other/${area_id.area_id}`, otherActivitie);
    await queryClient.invalidateQueries('otherActivities');
    toast.success('Manejo criado com sucesso!');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const updateOtherActivitie = async (
  area_id,
  other_activities_id,
  otherActivitie,
) => {
  try {
    const response = await customFetch.put(
      `/other/${other_activities_id}/area/${area_id}`,
      otherActivitie,
    );
    await queryClient.invalidateQueries('otherActivities');
    toast.success('Manejo alterado com sucesso!');
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const deleteOtherActivitie = async (area_id, other_activities_id) => {
  try {
    await customFetch.delete(`/other/${other_activities_id}/area/${area_id}`);
    await queryClient.invalidateQueries('otherActivities');
    toast.success('Manejo apagado com sucesso!');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};
