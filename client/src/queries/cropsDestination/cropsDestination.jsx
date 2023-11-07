import { useQuery } from 'react-query';
import customFetch from '../../utils/axios';
import { toast } from 'react-toastify';
import queryClient from '../../services/queryClient';

async function getCropsDestination(area_id) {
  const { data, error } = await customFetch.get(`/crop/destination/${area_id}`);
  if (error) {
    toast.success(error);
  }
  return data.data;
}

export function useFetchCropsDestination(area_id) {
  return useQuery(['cropsDestination', area_id], () =>
    getCropsDestination(area_id),
  );
}

async function getOneCropDestination(area_id, crop_id) {
  const { data, error } = await customFetch.get(
    `/crop/destination/${area_id}/crop/${crop_id}`,
  );
  if (error) {
    toast.success(error);
  }
  return data;
}

export function useFetchOneCropDestination(crop_id, crop_sale_id) {
  return useQuery(['cropSalee', crop_id, crop_sale_id], () =>
    getOneCropDestination(crop_id, crop_sale_id),
  );
}

export const createCropDestination = async (crop, cropSale) => {
  try {
    await customFetch.post(
      `/crop/destination/${crop.crop.area_id}/crop/${crop.crop.id}`,
      cropSale,
    );
    await queryClient.invalidateQueries('cropsDestination');
    toast.success('Produção criada com sucesso!');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const updateCropDestination = async (
  cropDestination,
  cropDestinations,
) => {
  try {
    const response = await customFetch.put(
      `/crop/destination/${cropDestination.cropDestination.area_id}/area/${cropDestination.cropDestination.crop_id}/crop/${cropDestination.cropDestination.id}`,
      cropDestinations,
    );
    await queryClient.invalidateQueries('cropsDestination');
    toast.success('Produção alterada com sucesso!');
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const deleteCropDestination = async (cropDestination) => {
  try {
    await customFetch.delete(
      `/crop/destination/${cropDestination.cropDestination.crop_id}/crop/${cropDestination.cropDestination.id}`,
    );
    await queryClient.invalidateQueries('cropsDestination');
    toast.success('Produção apagada com sucesso!');
  } catch (error) {
    toast.error(error.response);
  }
};
