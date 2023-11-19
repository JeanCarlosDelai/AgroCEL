import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateAreaSchema } from '../../schemas/CreateAreaSchema';
import { AreaVarietys } from '../../Arrays/AreaVarietys';
import { RookstockTypes } from '../../Arrays/RookstockTypes';
import { DrivingSystems } from '../../Arrays/DrivingSystems';
import OpenCloseModal from '../modal/OpenCloseModal';
import FormRow from '../Form/FormRow';
import ClearButtonForm from '../Buttons/ClearButtonForm';
import SubmitButton from '../Buttons/SubmitButton';
import { createArea } from '../../queries/areas/areas';

const CreateAreaModal = (property_id) => {
  console.log(property_id);
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      species: 'Uva',
      variety: 'Selecione',
      rookstock_type: 'Selecione',
      driving_system: 'Selecione',
      cultivated_area: 0,
      geographic_coordinates: '',
      implementation_date: new Date().toISOString().split('T')[0],
      number_rows: 0,
      distance_between_rows: 0,
      distance_between_plants: 0,
      number_plants: 0,
    },
    resolver: yupResolver(CreateAreaSchema),
  });

  function openCreateModal() {
    setCreateModalOpen(true);
  }

  function closeCreateModal() {
    setCreateModalOpen(false);
  }

  const handlerCreate = async (areas) => {
    setCreateModalOpen(false);
    await createArea(property_id, areas);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openCreateModal}
        closeModal={closeCreateModal}
        modalName={'Adicionar área'}
        modalButton={' + Adicionar área'}
        classStyle={true}
        backdrop={false}
        colorText={'text-gray-300'}
      >
        <form onSubmit={handleSubmit(handlerCreate)}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <FormRow
              type="text"
              name="name"
              labelText="Name"
              placeholder="Nome"
              control={control}
              hasError={JSON.stringify(errors.name?.message)}
            />
            <FormRow
              type="text"
              name="species"
              labelText="Espécie"
              placeholder="Espécie"
              control={control}
              disabled={true}
              hasError={JSON.stringify(errors.species?.message)}
            />
            <FormRow
              type="number"
              name="cultivated_area"
              labelText="Área total"
              placeholder="Número de hectares"
              control={control}
              hasError={JSON.stringify(errors.cultivated_area?.message)}
            />
            <FormRow
              type="text"
              name="geographic_coordinates"
              labelText="Coordenadas Geográficas"
              placeholder="Coordenadas Geográficas"
              control={control}
              hasError={JSON.stringify(errors.geographic_coordinates?.message)}
            />
            <FormRow
              type="date"
              name="implementation_date"
              labelText="Data de Implantação"
              control={control}
              hasError={JSON.stringify(errors.implementation_date?.message)}
            />
            <FormRow
              type="select"
              name="driving_system"
              labelText="Sistema de condução"
              placeholder="Coloque o sistema de condução"
              options={DrivingSystems}
              control={control}
              hasError={JSON.stringify(errors.driving_system?.message)}
            />
            <FormRow
              type="select"
              name="rookstock_type"
              labelText="Tipo de porta Enxerto"
              placeholder="Coloque o tipo de porta enxerto"
              options={RookstockTypes}
              control={control}
              hasError={JSON.stringify(errors.rookstock_type?.message)}
            />
            <FormRow
              type="select"
              name="variety"
              labelText="Variedade"
              placeholder="Coloque a variedade"
              options={AreaVarietys}
              control={control}
              hasError={JSON.stringify(errors.variety?.message)}
            />
            <FormRow
              type="number"
              name="number_rows"
              labelText="Número de fileiras"
              placeholder="Coloque a quantidade de fileiras"
              control={control}
              hasError={JSON.stringify(errors.number_rows?.message)}
            />
            <FormRow
              type="number"
              name="distance_between_rows"
              labelText="Distância entre fileiras"
              placeholder="Coloque a distância entre fileiras"
              control={control}
              hasError={JSON.stringify(errors.distance_between_rows?.message)}
            />
            <FormRow
              type="number"
              name="distance_between_plants"
              labelText="Distância entre plantas"
              placeholder="Coloque a distância entre plantas"
              control={control}
              hasError={JSON.stringify(errors.distance_between_plants?.message)}
            />
            <FormRow
              type="number"
              name="number_plants"
              labelText="Número de plantas"
              placeholder="Coloque o número de plantas"
              control={control}
              hasError={JSON.stringify(errors.number_plants?.message)}
            />
          </div>
          <div className="relative inline-flex items-center justify-center">
            <ClearButtonForm onClick={() => reset()} />
            <SubmitButton label="Enviar" />
          </div>
        </form>
      </OpenCloseModal>
    </div>
  );
};
export default CreateAreaModal;
