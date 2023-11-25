import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateApplicationSchema } from '../../../schemas/CreateApplicationSchema';
import OpenCloseModal from '../../modal/OpenCloseModal';
import FormRow from '../../Form/FormRow';
import ClearButtonForm from '../../Buttons/ClearButtonForm';
import SubmitButton from '../../Buttons/SubmitButton';
import { createApplication } from '../../../queries/applications/applications';

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
      application_date: new Date().toISOString().split('T')[0],
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
    const areaId = area_id.area_id;
    setCreateModalOpen(false);
    await createApplication(areaId, applications);
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
              type="date"
              name="application_date"
              labelText="Data da aplicação"
              control={control}
              hasError={JSON.stringify(errors.application_date?.message)}
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
              labelText="Quantidade de produto / Kg"
              placeholder="10"
              control={control}
              hasError={JSON.stringify(errors.quantity?.message)}
            />
            <FormRow
              type="number"
              name="application_time"
              labelText="Tempo de aplicação /h"
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
export default CreateApplicationModal;
