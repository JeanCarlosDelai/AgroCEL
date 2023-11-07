import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormRow from '../../Form/FormRow';
import OpenCloseModal from '../../modal/OpenCloseModal';
import ClearButtonForm from '../../Buttons/ClearButtonForm';
import SubmitButton from '../../Buttons/SubmitButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateCropSaleSchema } from '../../../schemas/CreateCropSaleSchema';
import { updateCropSale } from '../../../queries/cropsSale/cropsSale';
import { BsCurrencyDollar } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { CreateCropDestinationSchema } from '../../../schemas/CreateCropDestinationSchema';
import { updateCropDestination } from '../../../queries/cropsDestination/cropsDestination';

const UpdateCropDestinationModal = (cropDestination) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: cropDestination.cropDestination.name,
      processing_type: cropDestination.cropDestination.processing_type,
      destination: cropDestination.cropDestination.destination,
      quantity: cropDestination.cropDestination.quantity,
    },
    resolver: yupResolver(CreateCropDestinationSchema),
  });

  function openUpdateModal() {
    setCreateModalOpen(true);
  }

  function closeUpdateModal() {
    setCreateModalOpen(false);
  }

  const handlerUpdate = async (cropDestinations) => {
    setCreateModalOpen(false);
    await updateCropDestination(cropDestination, cropDestinations);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openUpdateModal}
        closeModal={closeUpdateModal}
        modalName={'Atualizar Produção da Colheita'}
        modalButton={<AiOutlineEdit size={15} />}
        classStyle={false}
        backdrop={false}
        colorText={'text-green-500'}
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

export default UpdateCropDestinationModal;
