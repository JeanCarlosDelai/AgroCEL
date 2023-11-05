import { useQuery } from 'react-query';
import customFetch from '../../utils/axios';
import { toast } from 'react-toastify';
import queryClient from '../../services/queryClient';

async function getCrops(area_id) {
  const { data, error } = await customFetch.get(`/crop/${area_id}`);
  if (error) {
    toast.success(error);
  }
  return data.data;
}

export function useFetchCrops(area_id) {
  return useQuery(['crops', area_id], () => getCrops(area_id));
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

export const createCrop = async (area_id, crop) => {
  console.log(crop);
  try {
    await customFetch.post(`/crop/${area_id.area_id}`, crop);
    await queryClient.invalidateQueries('crops');
    toast.success('Colheita criada com sucesso!');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const updateCrop = async (area_id, crop_id, crop) => {
  try {
    const response = await customFetch.put(
      `/crop/${crop_id}/area/${area_id}`,
      crop,
    );
    await queryClient.invalidateQueries('crops');
    toast.success('Colheita alterada com sucesso!');
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const deleteCrop = async (area_id, crop_id) => {
  try {
    await customFetch.delete(`/crop/${crop_id}/area/${area_id}`);
    await queryClient.invalidateQueries('crops');
    toast.success('Colheita apagada com sucesso!');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};
