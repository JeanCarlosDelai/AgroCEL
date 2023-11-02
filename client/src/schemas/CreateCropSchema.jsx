import * as yup from 'yup';

export const CreateCropSchema = yup
  .object({
    name: yup
      .string()
      .required('Por favor, forneça o nome da colheita')
      .min(4, 'O nome deve ter no mínimo 4 caracteres'),
    quantity: yup
      .number()
      .positive('A quantidade colhida deve ser um número positivo')
      .integer('A quantidade colhida deve ser um número inteiro')
      .required('Por favor, forneça a quantidade colhida'),
    crop_time: yup
      .number()
      .positive('O tempo de colheita deve ser um número positivo')
      .integer('O tempo de colheita deve ser um número inteiro')
      .required('Por favor, forneça o tempo de colheita'),
    crop_date: yup
      .date('Deve ser uma data válida')
      .required('Por favor, selecione a data da colheita')
      .min(4, 'A data da colheita deve ter no mínimo 4 caracteres')
      .max(new Date(), 'A data da colheita não pode ser no futuro'),
  })
  .required();
