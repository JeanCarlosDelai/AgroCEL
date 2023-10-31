import { useQuery, useMutation } from 'react-query';
import customFetch from '../../utils/axios';
import { toast } from 'react-toastify';
import queryClient from '../../services/queryClient';

async function getPropertys() {
  const { data, error } = await customFetch.get(`/property/user`);
  if (error) {
    toast.success(error);
  }
  return data.data;
}

export function useFetchProperty() {
  return useQuery(['propertys'], getPropertys);
}

export const createProperty = async (property) => {
  try {
    await customFetch.post('/property', property);
    await queryClient.invalidateQueries('propertys');
    toast.success('Propriedade criada com sucesso!');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const updateProperty = async (property_id, property) => {
  try {
    const response = await customFetch.put(
      `/property/${property_id}`,
      property,
    );
    await queryClient.invalidateQueries('propertys');
    toast.success('Propriedade alterada com sucesso!');
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const deleteProperty = async (property_id) => {
  try {
    await customFetch.delete(`/property/${property_id}`);
    await queryClient.invalidateQueries('propertys');
    toast.success('Propriedade apagada com sucesso!');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};
