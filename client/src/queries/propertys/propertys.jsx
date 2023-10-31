import { useQuery } from 'react-query';
import customFetch from '../../utils/axios';
import { toast } from 'react-toastify';

async function getPropertys() {
  const { data } = await customFetch.get(`/property/user`);

  return data.data;
}

export function useFetchProperty() {
  return useQuery(['propertys'], getPropertys);
}

export const createProperty = async (property) => {
  try {
    await customFetch.post('/property', property);
    toast.success('Propriedade criada com sucesso!');
    window.location.reload();
    return response.data;
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
    window.location.reload();
    toast.success('Propriedade alterada com sucesso!');
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const deleteProperty = async (property_id) => {
  try {
    await customFetch.delete(`/property/${property_id}`);
    window.location.reload();
    toast.success('Propriedade apagada com sucesso!');
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};
