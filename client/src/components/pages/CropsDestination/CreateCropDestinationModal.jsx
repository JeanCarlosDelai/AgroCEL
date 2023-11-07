import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import OpenCloseModal from '../../modal/OpenCloseModal';
import FormRow from '../../Form/FormRow';
import ClearButtonForm from '../../Buttons/ClearButtonForm';
import SubmitButton from '../../Buttons/SubmitButton';
import { CreateCropDestinationSchema } from '../../../schemas/CreateCropDestinationSchema';
import { createCropDestination } from '../../../queries/cropsDestination/cropsDestination';
import { FaWineBottle } from 'react-icons/fa';

const CreateCropSaleModal = (crop) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      processing_type: '',
      destination: '',
      quantity: '',
    },
    resolver: yupResolver(CreateCropDestinationSchema),
  });

  function openCreateModal() {
    setCreateModalOpen(true);
  }

  function closeCreateModal() {
    setCreateModalOpen(false);
  }

  const handlerCreate = async (cropsSale) => {
    setCreateModalOpen(false);
    await createCropDestination(crop, cropsSale);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openCreateModal}
        closeModal={closeCreateModal}
        modalName={'Adicionar Destinação da Colheita'}
        modalButton={<FaWineBottle size={15} />}
        classStyle={false}
        backdrop={false}
        colorText={'text-green-500'}
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
              name="quantity"
              labelText="Quantidade"
              placeholder="Quantidade"
              control={control}
              hasError={JSON.stringify(errors.quantity?.message)}
            />
            <FormRow
              type="text"
              name="destination"
              labelText="Destinação"
              placeholder="Ex: Produção Própria"
              control={control}
              hasError={JSON.stringify(errors.destination?.message)}
            />
            <FormRow
              type="text"
              name="processing_type"
              labelText="Tipo de processamento"
              placeholder="Ex: Vinho"
              control={control}
              hasError={JSON.stringify(errors.processing_type?.message)}
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
export default CreateCropSaleModal;
