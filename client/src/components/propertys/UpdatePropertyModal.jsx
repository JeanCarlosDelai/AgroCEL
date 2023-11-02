import { useState } from 'react';
import { updateProperty } from '../../queries/propertys/propertys';
import { useForm } from 'react-hook-form';
import FormRow from '../FormRow';
import OpenCloseModal from '../OpenCloseModal';
import ClearButtonForm from '../Buttons/ClearButtonForm';
import SubmitButton from '../Buttons/SubmitButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreatePropertySchema } from '../../schemas/CreatePropertySchema';
import usePropertyStore from '../../store/propertys/usePropertyStore';
import { AiOutlineEdit } from 'react-icons/ai';

const UpdatePropertyModal = (property) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);
  const selectProperty = usePropertyStore((state) => state.selectProperty);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: property.value.name,
      cultivated_area: property.value.cultivated_area,
      total_area: property.value.total_area,
      city: property.value.city,
      state: property.value.state,
    },
    resolver: yupResolver(CreatePropertySchema),
  });

  function openUpdateModal() {
    setCreateModalOpen(true);
  }

  function closeUpdateModal() {
    setCreateModalOpen(false);
  }

  const handlerUpdate = async (propertys) => {
    console.log(propertys);
    setCreateModalOpen(false);
    await updateProperty(property.value.id, propertys);

    selectProperty({
      name: propertys.name,
      property_id: propertys.id,
    });
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openUpdateModal}
        closeModal={closeUpdateModal}
        modalName={'Editar propriedade'}
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
              name="cultivated_area"
              labelText="Área cultivada"
              placeholder="Número de hectares"
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
              type="text"
              name="state"
              labelText="Estado"
              placeholder="Seu Estado"
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

export default UpdatePropertyModal;
