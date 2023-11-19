import * as yup from 'yup';

export const CreatePropertySchema = yup
  .object({
    name: yup
      .string()
      .required('Por favor, forneça o nome da propriedade')
      .min(4, 'O nome deve ter no mínimo 4 caracteres'),
    total_area: yup
      .number()
      .positive('A área total deve ser um número positivo')
      .integer('A área total deve ser um número inteiro')
      .required('Por favor, forneça a área total'),
    cultivated_area: yup
      .number()
      .required('Por favor, forneça a área cultivada'),
    city: yup
      .string()
      .required('Por favor, forneça a cidade')
      .min(4, 'A cidade deve ter no mínimo 4 caracteres'),
    state: yup
      .string()
      .required('Por favor, forneça o estado')
      .min(2, 'O estado deve ter no mínimo 2 caracteres'),
  })
  .required();
