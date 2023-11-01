import { useState } from 'react';
import { updateProperty } from '../../queries/propertys/propertys';
import { useForm } from 'react-hook-form';
import FormRow from '../FormRow';
import OpenCloseModal from '../OpenCloseModal';
import ClearButtonForm from '../Buttons/ClearButtonForm';
import SubmitButton from '../Buttons/SubmitButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateAreaSchema } from '../../schemas/CreateAreaSchema';
import usePropertyStore from '../../store/propertys/usePropertyStore';
import { AiOutlineEdit } from 'react-icons/ai';

const UpdateAreaModal = (area) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: area.value.name,
      species: area.value.species,
      variety: area.value.variety,
      driving_system: area.value.driving_system,
      cultivated_area: area.value.cultivated_area,
      geographic_coordinates: area.value.geographic_coordinates,
      implementation_date: area.value.implementation_date,
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
    await updateProperty(area.value.property_id, area.value.id, areas);
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
              type="text"
              name="implementation_date"
              labelText="Data de implantação"
              placeholder="Data de implantação"
              control={control}
              hasError={JSON.stringify(errors.implementation_date?.message)}
            />
            <FormRow
              type="select"
              name="variety"
              labelText="Variedade"
              options={AreaVarietys}
              placeholder="Coloque a variedade"
              // value={selectedValue}
              // handleChange={handleSelectChange}
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

export default UpdateAreaModal;
