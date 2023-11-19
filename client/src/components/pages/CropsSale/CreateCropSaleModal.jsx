import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import OpenCloseModal from '../../modal/OpenCloseModal';
import FormRow from '../../Form/FormRow';
import ClearButtonForm from '../../Buttons/ClearButtonForm';
import SubmitButton from '../../Buttons/SubmitButton';
import { BsCurrencyDollar } from 'react-icons/bs';
import { createCropSale } from '../../../queries/cropsSale/cropsSale';
import { CreateCropSaleSchema } from '../../../schemas/CreateCropSaleSchema';

const CreateCropSaleModal = (crop) => {
  console.log(crop.crop.quantity);

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
      quantity: crop.crop.quantity,
    },
    resolver: yupResolver(CreateCropSaleSchema),
  });

  function openCreateModal() {
    setCreateModalOpen(true);
  }

  function closeCreateModal() {
    setCreateModalOpen(false);
  }

  const handlerCreate = async (cropsSale) => {
    setCreateModalOpen(false);
    await createCropSale(crop, cropsSale);
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
              labelText="Nome da venda"
              placeholder="Venda 1"
              control={control}
              hasError={JSON.stringify(errors.name?.message)}
            />
            <FormRow
              type="number"
              name="quantity"
              labelText="Quantidade / Kg"
              placeholder="100 Kg"
              control={control}
              disabled={true}
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
              labelText="Grau da carga"
              placeholder="17º"
              control={control}
              hasError={JSON.stringify(errors.graduation?.message)}
            />
            <FormRow
              type="number"
              name="price"
              labelText="Preço por Kg"
              placeholder="1 Kg"
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
