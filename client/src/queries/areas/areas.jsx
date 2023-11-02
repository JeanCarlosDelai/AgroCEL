import { useQuery } from 'react-query';
import customFetch from '../../utils/axios';
import { toast } from 'react-toastify';
import queryClient from '../../services/queryClient';

async function getAreas(property_id) {
  const { data, error } = await customFetch.get(`/area/${property_id}`);
  if (error) {
    toast.success(error);
  }
  return data.data;
}

export function useFetchArea(property_id) {
  return useQuery(['areas', property_id], () => getAreas(property_id));
}

async function getOneArea(property_id, area_id) {
  const { data, error } = await customFetch.get(
    `/area/${property_id}/property/${area_id}`,
  );
  if (error) {
    toast.success(error);
  }
  return data;
}

export function useFetchOneArea(property_id, area_id) {
  return useQuery(['area', property_id, area_id], () =>
    getOneArea(property_id, area_id),
  );
}

export const createArea = async (property_id, area) => {
  console.log(property_id.property_id);
  try {
    await customFetch.post(`/area/${property_id.property_id}`, area);
    await queryClient.invalidateQueries('areas');
    toast.success('Área criada com sucesso!');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const updateArea = async (property_id, area_id, area) => {
  try {
    const response = await customFetch.put(
      `/area/${property_id}/put/${area_id}`,
      area,
    );
    await queryClient.invalidateQueries('areas');
    toast.success('Área alterada com sucesso!');
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const deleteArea = async (property_id, area_id) => {
  console.log(property_id);
  try {
    await customFetch.delete(`/area/${property_id}/delete/${area_id}`);
    await queryClient.invalidateQueries('areas');
    toast.success('Área apagada com sucesso!');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};
