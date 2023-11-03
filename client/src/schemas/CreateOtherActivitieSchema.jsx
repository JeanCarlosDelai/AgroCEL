import * as yup from 'yup';

export const CreateOtherActivitieSchema = yup
  .object({
    name: yup
      .string()
      .required('Por favor, forneça o nome do manejo')
      .min(4, 'O nome do manejo deve ter no mínimo 4 caracteres'),
    activitie_category: yup
      .string()
      .required('Por favor, forneça o da categoria ')
      .min(4, 'A categoria deve ter no mínimo 4 caracteres'),
    description: yup
      .string()
      .required('Por favor, forneça a descrição')
      .min(4, 'A  descrição deve ter no mínimo 4 caracteres'),
    activitie_time: yup
      .number()
      .positive('O tempo de manejo deve ser um número positivo')
      .integer('O tempo de manejo deve ser um número inteiro')
      .required('Por favor, forneça o tempo de manejo'),
    activitie_date: yup
      .date('Deve ser uma data válida')
      .required('Por favor, selecione a data da manejo')
      .min(4, 'A data da manejo deve ter no mínimo 4 caracteres')
      .max(new Date(), 'A data da manejo não pode ser no futuro'),
  })
  .required();
