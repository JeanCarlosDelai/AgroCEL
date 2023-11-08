import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateCropSchema } from '../../../schemas/CreateCropSchema';
import OpenCloseModal from '../../modal/OpenCloseModal';
import FormRow from '../../Form/FormRow';
import ClearButtonForm from '../../Buttons/ClearButtonForm';
import SubmitButton from '../../Buttons/SubmitButton';
import { CreateOtherActivitieSchema } from '../../../schemas/CreateOtherActivitieSchema';
import { createOtherActivitie } from '../../../queries/otherActivities/otherActivities';
import usePropertyStore from '../../../store/propertys/usePropertyStore';
import { useFetchArea } from '../../../queries/areas/areas';
import FormSelectObject from '../../Form/FormSelectObject';

const CreateOtherActivitieModalField = () => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);

  const selectedProperty = usePropertyStore((state) => state.selectedProperty);

  const property_id = selectedProperty.property_id;

  const areas = useFetchArea(property_id);

  const areaOptions = areas.data
    ? areas.data.map((area) => ({
        value: area.id,
        label: area.name,
      }))
    : [];

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      area_id: '',
      name: '',
      activitie_category: '',
      activitie_date: new Date().toISOString().split('T')[0],
      activitie_time: '',
      description: '',
    },
    resolver: yupResolver(CreateOtherActivitieSchema),
  });

  function openCreateModal() {
    setCreateModalOpen(true);
  }

  function closeCreateModal() {
    setCreateModalOpen(false);
  }

  const handlerCreate = async (otherActivitie) => {
    setCreateModalOpen(false);
    await createOtherActivitie(otherActivitie.area_id, otherActivitie);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openCreateModal}
        closeModal={closeCreateModal}
        modalName={'Adicionar manejo'}
        modalButton={' + Adicionar manejo'}
        classStyle={true}
        backdrop={false}
        colorText={'text-gray-300'}
      >
        <form onSubmit={handleSubmit(handlerCreate)}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <FormSelectObject
              type="select"
              name="area_id"
              labelText="Selecionar área"
              control={control}
              options={areaOptions}
            />
            <FormRow
              type="text"
              name="name"
              labelText="Nome do manejo"
              placeholder="Poda Concord"
              control={control}
              hasError={JSON.stringify(errors.name?.message)}
            />
            <FormRow
              type="text"
              name="activitie_category"
              labelText="Categoria da atividade"
              placeholder="Poda"
              control={control}
              hasError={JSON.stringify(errors.activitie_category?.message)}
            />
            <FormRow
              type="date"
              name="activitie_date"
              labelText="Data do manejo"
              control={control}
              hasError={JSON.stringify(errors.activitie_date?.message)}
            />
            <FormRow
              type="text"
              name="description"
              labelText="Descrição"
              placeholder="Descrição"
              control={control}
              hasError={JSON.stringify(errors.description?.message)}
            />
            <FormRow
              type="number"
              name="activitie_time"
              labelText="Tempo de manejo / h"
              placeholder="10 h"
              control={control}
              hasError={JSON.stringify(errors.activitie_time?.message)}
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
export default CreateOtherActivitieModalField;
