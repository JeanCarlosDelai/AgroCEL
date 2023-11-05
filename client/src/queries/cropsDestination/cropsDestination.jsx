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
    `/crop/sale/${area_id}/crop/${crop_id}`,
  );
  if (error) {
    toast.success(error);
  }
  return data;
}

export function useFetchOneCropDestination(crop_id, crop_sale_id) {
  return useQuery(['cropSalee', crop_id, crop_sale_id], () =>
    getOneCropSale(crop_id, crop_sale_id),
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

export const updateCropDestination = async (cropSale, cropSales) => {
  try {
    const response = await customFetch.put(
      `/crop/destination/${cropSale.cropSale.area_id}/area/${cropSale.cropSale.crop_id}/crop/${cropSale.cropSale.id}`,
      cropSales,
    );
    await queryClient.invalidateQueries('cropsDestination');
    toast.success('Produção alterada com sucesso!');
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const deleteCropSale = async (cropSale) => {
  try {
    await customFetch.delete(
      `/crop/destination/${cropSale.cropSale.crop_id}/crop/${cropSale.cropSale.id}`,
    );
    await queryClient.invalidateQueries('cropsDestination');
    toast.success('Produção apagada com sucesso!');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};
