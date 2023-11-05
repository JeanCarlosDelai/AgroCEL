import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateCropSchema } from '../../../schemas/CreateCropSchema';
import OpenCloseModal from '../../modal/OpenCloseModal';
import FormRow from '../../Form/FormRow';
import ClearButtonForm from '../../Buttons/ClearButtonForm';
import SubmitButton from '../../Buttons/SubmitButton';
import { BsCurrencyDollar } from 'react-icons/bs';
import { createCropSale } from '../../../queries/cropsSale/cropsSale';

const CreateCropSaleModal = (area_id) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      purchasing_entity: '',
      purchasing_entity_cnpj: '',
      graduation: '',
      price: '',
      discharge_date: new Date().toISOString().split('T')[0],
      quantity: '',
    },
    // resolver: yupResolver(CreateCropSchema),
  });

  function openCreateModal() {
    setCreateModalOpen(true);
  }

  function closeCreateModal() {
    setCreateModalOpen(false);
  }

  const handlerCreate = async (crops) => {
    setCreateModalOpen(false);
    await createCropSale(area_id, crops);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openCreateModal}
        closeModal={closeCreateModal}
        modalName={'Adicionar Venda da Colheita'}
        modalButton={<BsCurrencyDollar size={15} />}
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
              type="date"
              name="discharge_date"
              labelText="Data da descarga"
              control={control}
              hasError={JSON.stringify(errors.discharge_date?.message)}
            />
            <FormRow
              type="text"
              name="purchasing_entity"
              labelText="Entidade compradora"
              placeholder="Entidade"
              control={control}
              hasError={JSON.stringify(errors.purchasing_entity?.message)}
            />
            <FormRow
              type="text"
              name="purchasing_entity_cnpj"
              labelText="CNPJ Entidade compradora"
              placeholder="Entidade CNPJ"
              control={control}
              hasError={JSON.stringify(errors.purchasing_entity_cnpj?.message)}
            />
            <FormRow
              type="number"
              name="graduation"
              labelText="Grau"
              placeholder="0"
              control={control}
              hasError={JSON.stringify(errors.graduation?.message)}
            />
            <FormRow
              type="number"
              name="price"
              labelText="Preço"
              placeholder="0"
              control={control}
              hasError={JSON.stringify(errors.price?.message)}
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
