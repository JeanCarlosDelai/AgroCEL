import { LiaBroomSolid } from 'react-icons/lia';
import { AiOutlineSend } from 'react-icons/ai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createProperty } from '../../queries/propertys/propertys';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateAreaSchema } from '../../schemas/CreateAreaSchema';
import { AreaVarietys } from '../../Arrays/AreaVarietys';

const CreateAreaModal = (property_id) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      species: '',
      variety: '',
      driving_system: '',
      cultivated_area: '',
      geographic_coordinates: '',
      implementation_date: '',
      number_rows: '',
      distance_between_rows: '',
      distance_between_plants: '',
      number_plants: '',
    },
    resolver: yupResolver(CreateAreaSchema),
  });

  function openCreateModal() {
    setCreateModalOpen(true);
  }

  function closeCreateModal() {
    setCreateModalOpen(false);
  }

  const handlerCreate = async (propertys) => {
    setCreateModalOpen(false);
    await createArea(property_id, propertys);
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
export default CreateAreaModal;
