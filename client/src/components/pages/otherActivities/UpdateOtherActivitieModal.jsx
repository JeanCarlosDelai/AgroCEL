import { useState } from 'react';
import { updateCrop } from '../../../queries/crops/crops';
import { Controller, useForm } from 'react-hook-form';
import FormRow from '../../Form/FormRow';
import OpenCloseModal from '../../modal/OpenCloseModal';
import ClearButtonForm from '../../Buttons/ClearButtonForm';
import SubmitButton from '../../Buttons/SubmitButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiOutlineEdit } from 'react-icons/ai';
import { CreateOtherActivitieSchema } from '../../../schemas/CreateOtherActivitieSchema';

const UpdateOtherActivitieModal = (otherActivitie) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: otherActivitie.otherActivitie.name,
      activitie_category: otherActivitie.otherActivitie.activitie_category,
      activitie_date: otherActivitie.otherActivitie.activitie_date,
      activitie_time: otherActivitie.otherActivitie.activitie_time,
      description: otherActivitie.otherActivitie.description,
    },
    resolver: yupResolver(CreateOtherActivitieSchema),
  });

  function openUpdateModal() {
    setCreateModalOpen(true);
  }

  function closeUpdateModal() {
    setCreateModalOpen(false);
  }

  const handlerUpdate = async (otherActivities) => {
    console.log(otherActivities);
    setCreateModalOpen(false);
    await updateCrop(
      otherActivitie.otherActivitie.area_id,
      otherActivitie.otherActivitie.id,
      otherActivities,
    );
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openUpdateModal}
        closeModal={closeUpdateModal}
        modalName={'Editar manejo'}
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
              type="number"
              name="activitie_category"
              labelText="Categoria da atividade"
              placeholder="Categoria"
              control={control}
              hasError={JSON.stringify(errors.activitie_category?.message)}
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
              labelText="Tempo de manejo"
              placeholder="Tempo"
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

export default UpdateOtherActivitieModal;
