import * as yup from 'yup';

export const CreateCropSaleSchema = yup
  .object({
    name: yup
      .string()
      .required('Por favor, forneça o nome da Venda')
      .min(4, 'O nome deve ter no mínimo 4 caracteres'),
    purchasing_entity: yup
      .string()
      .required('Por favor, forneça o nome da Entidade compradora')
      .min(4, 'O nome da Entidade compradora deve ter no mínimo 4 caracteres'),
    purchasing_entity_cnpj: yup
      .string()
      .required('Por favor, forneça o CNPJ da Entidade compradora')
      .min(4, 'O CNPJ da Entidade compradora deve ter no mínimo 4 caracteres'),
    quantity: yup
      .number()
      .positive('A quantidade vendida deve ser um número positivo')
      .integer('A quantidade vendida deve ser um número inteiro')
      .required('Por favor, forneça a quantidade vendida'),
    graduation: yup
      .number()
      .positive('O Grau deve ser um número positivo')
      .integer('O Grau deve ser um número inteiro')
      .required('Por favor, forneça o grau'),
    price: yup
      .number()
      .positive('O valor da venda deve ser um número positivo')
      .integer('O valor da venda deve ser um número inteiro')
      .required('Por favor, forneça o valor da venda'),
    discharge_date: yup
      .date('Deve ser uma data válida')
      .required('Por favor, selecione a data da descarga')
      .min(4, 'A data da descarga deve ter no mínimo 4 caracteres')
      .max(new Date(), 'A data da descarga não pode ser no futuro'),
  })
  .required();
