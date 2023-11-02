import { useState } from 'react';
import { updateCrop } from '../../queries/crops/crops';
import { Controller, useForm } from 'react-hook-form';
import FormRow from '../FormRow';
import OpenCloseModal from '../OpenCloseModal';
import ClearButtonForm from '../Buttons/ClearButtonForm';
import SubmitButton from '../Buttons/SubmitButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateCropSchema } from '../../schemas/CreateCropSchema';
import { AiOutlineEdit } from 'react-icons/ai';
import ReactDatePicker from 'react-datepicker';

const UpdateCropModal = (crop) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: crop?.crop?.name,
      quantity: crop.crop.quantity,
      crop_date: crop.crop.crop_date,
      crop_time: crop.crop.crop_time,
    },
    resolver: yupResolver(CreateCropSchema),
  });

  function openUpdateModal() {
    setCreateModalOpen(true);
  }

  function closeUpdateModal() {
    setCreateModalOpen(false);
  }

  const handlerUpdate = async (crops) => {
    console.log(crops);
    setCreateModalOpen(false);
    await updateCrop(crop.crop.area_id, crop.crop.id, crops);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openUpdateModal}
        closeModal={closeUpdateModal}
        modalName={'Editar colheita'}
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
              name="quantity"
              labelText="Quantidade"
              placeholder="Quantidade"
              control={control}
              hasError={JSON.stringify(errors.quantity?.message)}
            />
            <FormRow
              type="number"
              name="crop_time"
              labelText="Tempo de colheita"
              placeholder="Tempo"
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

export default UpdateCropModal;
