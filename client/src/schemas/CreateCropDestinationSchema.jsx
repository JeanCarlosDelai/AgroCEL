import * as yup from 'yup';

export const CreateCropDestinationSchema = yup
  .object({
    name: yup
      .string()
      .required('Por favor, forneça o nome da Venda')
      .min(4, 'O nome deve ter no mínimo 4 caracteres'),
    destination: yup
      .string()
      .required('Por favor, forneça a destinação')
      .min(4, 'A destinação deve ter no mínimo 4 caracteres'),
    processing_type: yup
      .string()
      .required('Por favor, forneça o tipo de processamento')
      .min(4, 'O tipo de processamento ter no mínimo 4 caracteres'),
    quantity: yup
      .number()
      .positive('A quantidade vendida deve ser um número positivo')
      .integer('A quantidade vendida deve ser um número inteiro')
      .required('Por favor, forneça a quantidade vendida'),
  })
  .required();
