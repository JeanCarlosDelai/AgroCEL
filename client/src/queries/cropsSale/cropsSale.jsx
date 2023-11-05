import { useQuery } from 'react-query';
import customFetch from '../../utils/axios';
import { toast } from 'react-toastify';
import queryClient from '../../services/queryClient';

async function getCropsSale(crop_id) {
  const { data, error } = await customFetch.get(`/crop/sale/${crop_id}`);
  if (error) {
    toast.success(error);
  }
  return data.data;
}

export function useFetchCrops(crop_id) {
  return useQuery(['cropsSale', crop_id], () => getCropsSale(crop_id));
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

export const updateCropSale = async (
  area_id,
  crop_id,
  crop_sale_id,
  cropSale,
) => {
  try {
    const response = await customFetch.put(
      `/crop/sale/${area_id}/area/${crop_id}/crop/${crop_sale_id}`,
      cropSale,
    );
    await queryClient.invalidateQueries('cropsSale');
    toast.success('Venda alterada com sucesso!');
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const deleteCropSale = async (crop_id, crop_sale_id) => {
  try {
    await customFetch.delete(`/crop/sale/${crop_id}/crop/${crop_sale_id}`);
    await queryClient.invalidateQueries('cropsSale');
    toast.success('Venda apagada com sucesso!');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};
