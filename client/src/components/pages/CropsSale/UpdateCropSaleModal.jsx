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

const UpdateCropSaleModal = (cropSale) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);
  // console.log(cropSale.cropSale);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: cropSale.cropSale.name,
      purchasing_entity: cropSale.cropSale.purchasing_entity,
      purchasing_entity_cnpj: cropSale.cropSale.purchasing_entity_cnpj,
      graduation: cropSale.cropSale.graduation,
      price: cropSale.cropSale.price,
      discharge_date: new Date(cropSale.cropSale.discharge_date)
        .toISOString()
        .slice(0, 10),
      quantity: cropSale.cropSale.quantity,
    },
    resolver: yupResolver(CreateCropSaleSchema),
  });

  function openUpdateModal() {
    setCreateModalOpen(true);
  }

  function closeUpdateModal() {
    setCreateModalOpen(false);
  }

  const handlerUpdate = async (cropSales) => {
    setCreateModalOpen(false);
    await updateCropSale(cropSale, cropSales);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openUpdateModal}
        closeModal={closeUpdateModal}
        modalName={'Atualizar Venda da Colheita'}
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

export default UpdateCropSaleModal;
