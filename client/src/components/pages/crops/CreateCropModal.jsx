import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateCropSchema } from '../../../schemas/CreateCropSchema';
import OpenCloseModal from '../../modal/OpenCloseModal';
import FormRow from '../../Form/FormRow';
import ClearButtonForm from '../../Buttons/ClearButtonForm';
import SubmitButton from '../../Buttons/SubmitButton';
import { createCrop } from '../../../queries/crops/crops';

const CreateCropModal = (area_id) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      quantity: '',
      crop_date: new Date().toISOString().split('T')[0],
      crop_time: '',
    },
    resolver: yupResolver(CreateCropSchema),
  });

  function openCreateModal() {
    setCreateModalOpen(true);
  }

  function closeCreateModal() {
    setCreateModalOpen(false);
  }

  const handlerCreate = async (crops) => {
    console.log(crops);
    setCreateModalOpen(false);
    await createCrop(area_id, crops);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openCreateModal}
        closeModal={closeCreateModal}
        modalName={'Adicionar colheita'}
        modalButton={' + Adicionar colheita'}
        classStyle={true}
        backdrop={false}
        colorText={'text-gray-300'}
      >
        <form onSubmit={handleSubmit(handlerCreate)}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <FormRow
              type="text"
              name="name"
              labelText="Nome da Colheita"
              placeholder="Colheita 1"
              control={control}
              hasError={JSON.stringify(errors.name?.message)}
            />
            <FormRow
              type="number"
              name="quantity"
              labelText="Quantidade / Kg"
              placeholder="5000 Kg"
              control={control}
              hasError={JSON.stringify(errors.quantity?.message)}
            />
            <FormRow
              type="date"
              name="crop_date"
              labelText="Data da colheita"
              control={control}
              hasError={JSON.stringify(errors.crop_date?.message)}
            />
            <FormRow
              type="number"
              name="crop_time"
              labelText="Tempo de colheita / h"
              placeholder="10 horas"
              control={control}
              hasError={JSON.stringify(errors.crop_time?.message)}
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
export default CreateCropModal;
