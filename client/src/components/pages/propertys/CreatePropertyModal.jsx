import { useState } from 'react';
import { createProperty } from '../../../queries/propertys/propertys';
import { useForm } from 'react-hook-form';
import FormRow from '../../Form/FormRow';
import OpenCloseModal from '../../modal/OpenCloseModal';
import ClearButtonForm from '../../Buttons/ClearButtonForm';
import SubmitButton from '../../Buttons/SubmitButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreatePropertySchema } from '../../../schemas/CreatePropertySchema';
import { States } from '../../../Arrays/States';

const CreatePropertyModal = () => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      cultivated_area: 0,
      total_area: '',
      city: '',
      state: '',
    },
    resolver: yupResolver(CreatePropertySchema),
  });

  function openCreateModal() {
    setCreateModalOpen(true);
  }

  function closeCreateModal() {
    setCreateModalOpen(false);
  }

  const handlerCreate = async (propertys) => {
    setCreateModalOpen(false);
    await createProperty(propertys);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openCreateModal}
        closeModal={closeCreateModal}
        modalName={'Adicionar propriedade'}
        modalButton={' + Adicionar propriedade'}
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
              type="number"
              name="cultivated_area"
              labelText="Área cultivada"
              placeholder="Número de hectares"
              disabled={true}
              control={control}
              hasError={JSON.stringify(errors.cultivated_area?.message)}
            />
            <FormRow
              type="number"
              name="total_area"
              labelText="Área total"
              placeholder="Número de hectares"
              control={control}
              hasError={JSON.stringify(errors.total_area?.message)}
            />
            <FormRow
              type="text"
              name="city"
              labelText="Cidade"
              placeholder="Sua Cidade"
              control={control}
              hasError={JSON.stringify(errors.city?.message)}
            />
            <FormRow
              type="select"
              name="state"
              labelText="Estado"
              placeholder="Seu Estado"
              options={States}
              control={control}
              hasError={JSON.stringify(errors.state?.message)}
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

export default CreatePropertyModal;
