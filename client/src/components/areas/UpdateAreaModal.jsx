import { useState } from 'react';
import { updateArea } from '../../queries/areas/areas';
import { Controller, useForm } from 'react-hook-form';
import FormRow from '../Form/FormRow';
import OpenCloseModal from '../modal/OpenCloseModal';
import ClearButtonForm from '../Buttons/ClearButtonForm';
import SubmitButton from '../Buttons/SubmitButton';
import { AreaVarietys } from '../../Arrays/AreaVarietys';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateAreaSchema } from '../../schemas/CreateAreaSchema';
import { AiOutlineEdit } from 'react-icons/ai';
import ReactDatePicker from 'react-datepicker';
import { DrivingSystems } from '../../Arrays/DrivingSystems';
import { RookstockTypes } from '../../Arrays/RookstockTypes';

const UpdateAreaModal = (area) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: area.value.name,
      species: area.value.species,
      variety: area.value.variety,
      driving_system: area.value.driving_system,
      cultivated_area: area.value.cultivated_area,
      rookstock_type: area.value.rookstock_type,
      geographic_coordinates: area.value.geographic_coordinates,
      implementation_date: new Date(area.value.implementation_date)
        .toISOString()
        .slice(0, 10),
      number_rows: area.value.number_rows,
      distance_between_rows: area.value.distance_between_rows,
      distance_between_plants: area.value.distance_between_plants,
      number_plants: area.value.number_plants,
    },
    resolver: yupResolver(CreateAreaSchema),
  });

  function openUpdateModal() {
    setCreateModalOpen(true);
  }

  function closeUpdateModal() {
    setCreateModalOpen(false);
  }

  const handlerUpdate = async (areas) => {
    console.log(areas);
    setCreateModalOpen(false);
    await updateArea(area.value.property_id, area.value.id, areas);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openUpdateModal}
        closeModal={closeUpdateModal}
        modalName={'Editar área'}
        colorText={'text-green-600'}
        backdrop={false}
        modalButton={<AiOutlineEdit />}
        classStyle={false}
      >
        <form onSubmit={handleSubmit(handlerUpdate)}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <FormRow
              type="text"
              name="name"
              labelText="Nome da área"
              placeholder="Pareiral"
              control={control}
              hasError={JSON.stringify(errors.name?.message)}
            />
            <FormRow
              type="text"
              name="species"
              labelText="Espécie"
              placeholder="Uva"
              disabled={true}
              control={control}
              hasError={JSON.stringify(errors.species?.message)}
            />
            <FormRow
              type="number"
              name="cultivated_area"
              labelText="Área total / ha"
              placeholder="10 ha"
              control={control}
              hasError={JSON.stringify(errors.cultivated_area?.message)}
            />
            <FormRow
              type="text"
              name="geographic_coordinates"
              labelText="Coordenadas Geográficas"
              placeholder="-29.176640, -51.492992"
              control={control}
              hasError={JSON.stringify(errors.geographic_coordinates?.message)}
            />
            <FormRow
              type="date"
              name="implementation_date"
              labelText="Data de implantação"
              control={control}
              hasError={JSON.stringify(errors.implementation_date?.message)}
            />
            <FormRow
              type="select"
              name="driving_system"
              labelText="Sistema de condução"
              placeholder="Latada"
              options={DrivingSystems}
              control={control}
              hasError={JSON.stringify(errors.driving_system?.message)}
            />
            <FormRow
              type="select"
              name="rookstock_type"
              labelText="Tipo de porta Enxerto"
              placeholder="Pé Franco"
              options={RookstockTypes}
              control={control}
              hasError={JSON.stringify(errors.rookstock_type?.message)}
            />
            <FormRow
              type="select"
              name="variety"
              labelText="Variedade"
              placeholder="Isabel"
              options={AreaVarietys}
              control={control}
              hasError={JSON.stringify(errors.variety?.message)}
            />
            <FormRow
              type="number"
              name="number_rows"
              labelText="Número de fileiras"
              placeholder="100"
              control={control}
              hasError={JSON.stringify(errors.number_rows?.message)}
            />
            <FormRow
              type="number"
              name="distance_between_rows"
              labelText="Distância entre fileiras"
              placeholder="2"
              control={control}
              hasError={JSON.stringify(errors.distance_between_rows?.message)}
            />
            <FormRow
              type="number"
              name="distance_between_plants"
              labelText="Distância entre plantas"
              placeholder="1"
              control={control}
              hasError={JSON.stringify(errors.distance_between_plants?.message)}
            />
            <FormRow
              type="number"
              name="number_plants"
              labelText="Número de plantas"
              placeholder="1000"
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

export default UpdateAreaModal;
