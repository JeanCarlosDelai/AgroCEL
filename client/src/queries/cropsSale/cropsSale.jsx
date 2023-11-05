import { useQuery } from 'react-query';
import customFetch from '../../utils/axios';
import { toast } from 'react-toastify';
import queryClient from '../../services/queryClient';

async function getCropsSale(area_id) {
  const { data, error } = await customFetch.get(`/crop/sale/${area_id}`);
  if (error) {
    toast.success(error);
  }
  return data.data;
}

export function useFetchCropsSale(crop_id) {
  return useQuery(['cropsSale', crop_id], () => getCropsSale(crop_id));
}

async function getOneCropSale(area_id, crop_id) {
  const { data, error } = await customFetch.get(
    `/crop/sale/${area_id}/crop/${crop_id}`,
  );
  if (error) {
    toast.success(error);
  }
  return data;
}

export function useFetchOneCropSale(crop_id, crop_sale_id) {
  return useQuery(['cropSalee', crop_id, crop_sale_id], () =>
    getOneCropSale(crop_id, crop_sale_id),
  );
}

export const createCropSale = async (crop, cropSale) => {
  try {
    await customFetch.post(
      `/crop/sale/${crop.crop.area_id}/crop/${crop.crop.id}`,
      cropSale,
    );
    await queryClient.invalidateQueries('cropsSale');
    toast.success('Venda criada com sucesso!');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const updateCropSale = async (cropSale, cropSales) => {
  try {
    const response = await customFetch.put(
      `/crop/sale/${cropSale.cropSale.area_id}/area/${cropSale.cropSale.crop_id}/crop/${cropSale.cropSale.id}`,
      cropSales,
    );
    await queryClient.invalidateQueries('cropsSale');
    toast.success('Venda alterada com sucesso!');
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const deleteCropSale = async (cropSale) => {
  try {
    await customFetch.delete(
      `/crop/sale/${cropSale.cropSale.crop_id}/crop/${cropSale.cropSale.id}`,
    );
    await queryClient.invalidateQueries('cropsSale');
    toast.success('Venda apagada com sucesso!');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};
