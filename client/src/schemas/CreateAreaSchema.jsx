import * as yup from 'yup';

export const CreateAreaSchema = yup
  .object({
    name: yup
      .string()
      .required('Por favor, forneça o nome da área')
      .min(4, 'O nome deve ter no mínimo 4 caracteres'),
    cultivated_area: yup
      .number()
      .positive('A área cultivada deve ser um número positivo')
      .integer('A área cultivada deve ser um número inteiro')
      .required('Por favor, forneça a área cultivada'),
    species: yup
      .string()
      .required('Por favor, forneça a espécie')
      .min(3, 'A espécie deve ter no mínimo 3 caracteres'),
    variety: yup
      .string()
      .required('Por favor, selecione uma variedade')
      .min(2, 'A variedade deve ter no mínimo 2 caracteres'),
    driving_system: yup
      .string()
      .required('Por favor, selecione um sistema de condução')
      .min(2, 'O sistema de condução deve ter no mínimo 2 caracteres'),
    rookstock_type: yup
      .string()
      .required('Por favor, selecione o tipo do porta enxerto')
      .min(2, 'O tipo de porta enxerto deve ter no mínimo 2 caracteres'),
    geographic_coordinates: yup
      .string()
      .required('Por favor, coloque a Coordenada da área')
      .min(8, 'As coordenadas devem ter no mínimo 8caracteres'),
    implementation_date: yup
      .date('Deve ser uma data válida')
      .required('Por favor, selecione a data de implantação')
      .min(8, 'As coordenadas devem ter no mínimo 8 caracteres')
      .max(new Date(), 'A data de implantação não pode ser no futuro'),
    number_rows: yup
      .number()
      .positive('A quantidade de fileiras deve ser um número positivo')
      .integer('A quantidade de fileiras deve ser um número inteiro')
      .required('Por favor, forneça a quantidade de fileiras')
      .min(1, 'Nossa! que parreiral pequeno'),
    distance_between_rows: yup
      .number()
      .positive('A distância entre fileiras deve ser um número positivo')
      .integer('A distância entre fileiras deve ser um número inteiro')
      .required('Por favor, forneça a distância entre fileiras'),
    distance_between_plants: yup
      .number()
      .positive('A distância entre plantas deve ser um número positivo')
      .integer('A distância entre plantas deve ser um número inteiro')
      .required('Por favor, forneça a distância entre plantas'),
    number_plants: yup
      .number()
      .positive('A quantidade de plantas deve ser um número positivo')
      .integer('A quantidade de plantas deve ser um número inteiro')
      .required('Por favor, forneça a quantidade de plantas'),
  })
  .required();
