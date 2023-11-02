import { useQuery, useMutation } from 'react-query';
import customFetch from '../../utils/axios';
import { toast } from 'react-toastify';
import queryClient from '../../services/queryClient';

export const createUser = async (user) => {
  try {
    await customFetch.post('/users', user);
    toast.success('Usuário criado com sucesso!');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const login = async (userLogin) => {
  try {
    const response = await customFetch.post('/sessions', userLogin);

    toast.success('Usuário logado com sucesso!');
    return response;
  } catch (error) {
    toast.error(error.response?.data.msg);
  }
};

// export const updateProperty = async (property_id, property) => {
//   try {
//     const response = await customFetch.put(
//       `/property/${property_id}`,
//       property,
//     );
//     await queryClient.invalidateQueries('propertys');
//     toast.success('Propriedade alterada com sucesso!');
//     return response.data;
//   } catch (error) {
//     toast.error(error.response.data.msg);
//   }
// };

// export const deleteProperty = async (property_id) => {
//   try {
//     await customFetch.delete(`/property/${property_id}`);
//     await queryClient.invalidateQueries('propertys');
//     toast.success('Propriedade apagada com sucesso!');
//   } catch (error) {
//     toast.error(error.response.data.msg);
//   }
// };
