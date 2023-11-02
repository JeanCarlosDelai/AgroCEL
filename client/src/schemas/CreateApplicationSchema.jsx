import * as yup from 'yup';

export const CreateApplicationSchema = yup
  .object({
    used_product: yup
      .string()
      .required('Por favor, forneça o nome do produto usado')
      .min(4, 'O nome do produto deve ter no mínimo 4 caracteres'),
    application_type: yup
      .string()
      .required('Por favor, forneça o tipo da aplicação')
      .min(4, 'O tipo da aplicação deve ter no mínimo 4 caracteres'),
    description: yup
      .string()
      .required('Por favor, forneça uma descrição')
      .min(4, 'A descrição deve ter no mínimo 4 caracteres'),
    quantity: yup
      .number()
      .positive('A quantidade de produto usada deve ser um número positivo')
      .integer('A quantidade de produto usada  deve ser um número inteiro')
      .required('Por favor, forneça a quantidade de produto usada'),
    application_time: yup
      .number()
      .positive('O tempo da aplicação deve ser um número positivo')
      .integer('O tempo da aplicação deve ser um número inteiro')
      .required('Por favor, forneça o tempo da aplicação'),
    application_date: yup
      .date('Deve ser uma data válida')
      .required('Por favor, selecione a data da aplicação')
      .min(4, 'A data da aplicação deve ter no mínimo 4 caracteres')
      .max(new Date(), 'A data da aplicação não pode ser no futuro'),
  })
  .required();
