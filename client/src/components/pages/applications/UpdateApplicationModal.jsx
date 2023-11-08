import { useState } from 'react';
import { updateCrop } from '../../../queries/crops/crops';
import { Controller, useForm } from 'react-hook-form';
import FormRow from '../../Form/FormRow';
import OpenCloseModal from '../../modal/OpenCloseModal';
import ClearButtonForm from '../../Buttons/ClearButtonForm';
import SubmitButton from '../../Buttons/SubmitButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateApplication } from '../../../queries/applications/applications';
import { AiOutlineEdit } from 'react-icons/ai';
import { CreateApplicationSchema } from '../../../schemas/CreateApplicationSchema';

const UpdateApplicationModal = (application) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      used_product: application.application.used_product,
      quantity: application.application.quantity,
      application_type: application.application.application_type,
      application_date: new Date(application.application.application_date)
        .toISOString()
        .slice(0, 10),
      application_time: application.application.application_time,
      description: application.application.description,
    },
    resolver: yupResolver(CreateApplicationSchema),
  });

  function openUpdateModal() {
    setCreateModalOpen(true);
  }

  function closeUpdateModal() {
    setCreateModalOpen(false);
  }

  const handlerUpdate = async (applications) => {
    setCreateModalOpen(false);
    await updateApplication(
      application?.application?.area_id,
      application?.application?.id,
      applications,
    );
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
              name="used_product"
              labelText="Produto usado"
              placeholder="Sulfato"
              control={control}
              hasError={JSON.stringify(errors.used_product?.message)}
            />
            <FormRow
              type="text"
              name="application_type"
              labelText="Tipo de aplicação"
              placeholder="Pulverização"
              control={control}
              hasError={JSON.stringify(errors.application_type?.message)}
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
              type="date"
              name="application_date"
              labelText="Data da aplicação"
              control={control}
              hasError={JSON.stringify(errors.application_date?.message)}
            />
            <FormRow
              type="number"
              name="quantity"
              labelText="Quantidade de produto usado / Kg"
              placeholder="10"
              control={control}
              hasError={JSON.stringify(errors.quantity?.message)}
            />
            <FormRow
              type="number"
              name="application_time"
              labelText="Tempo de colheita / h"
              placeholder="10"
              control={control}
              hasError={JSON.stringify(errors.application_time?.message)}
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

export default UpdateApplicationModal;
