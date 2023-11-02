import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateApplicationSchema } from '../../schemas/CreateApplicationSchema';
import OpenCloseModal from '../OpenCloseModal';
import FormRow from '../FormRow';
import ClearButtonForm from '../Buttons/ClearButtonForm';
import SubmitButton from '../Buttons/SubmitButton';
import ReactDatePicker from 'react-datepicker';
import { createApplication } from '../../queries/applications/applications';

const CreateApplicationModal = (area_id) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      used_product: '',
      quantity: '',
      application_type: '',
      application_date: '',
      application_time: '',
      description: '',
    },
    resolver: yupResolver(CreateApplicationSchema),
  });

  function openCreateModal() {
    setCreateModalOpen(true);
  }

  function closeCreateModal() {
    setCreateModalOpen(false);
  }

  const handlerCreate = async (applications) => {
    setCreateModalOpen(false);
    await createApplication(area_id, applications);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openCreateModal}
        closeModal={closeCreateModal}
        modalName={'Adicionar aplicação'}
        modalButton={' + Adicionar aplicação'}
        classStyle={true}
        backdrop={false}
        colorText={'text-gray-300'}
      >
        <form onSubmit={handleSubmit(handlerCreate)}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <FormRow
              type="text"
              name="used_product"
              labelText="Produto"
              placeholder="Produto usado"
              control={control}
              hasError={JSON.stringify(errors.used_product?.message)}
            />
            <FormRow
              type="text"
              name="application_type"
              labelText="Tipo de aplicação"
              placeholder="Tipo de aplicação"
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
              type="number"
              name="quantity"
              labelText="Quantidade"
              placeholder="Quantidade"
              control={control}
              hasError={JSON.stringify(errors.quantity?.message)}
            />
            <FormRow
              type="number"
              name="application_time"
              labelText="Tempo de colheita"
              placeholder="Tempo"
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
export default CreateApplicationModal;
