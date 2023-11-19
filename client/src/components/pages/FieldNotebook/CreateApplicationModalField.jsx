import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateApplicationSchema } from '../../../schemas/CreateApplicationSchema';
import OpenCloseModal from '../../modal/OpenCloseModal';
import FormRow from '../../Form/FormRow';
import ClearButtonForm from '../../Buttons/ClearButtonForm';
import SubmitButton from '../../Buttons/SubmitButton';
import { createApplication } from '../../../queries/applications/applications';
import { useFetchArea } from '../../../queries/areas/areas';
import usePropertyStore from '../../../store/propertys/usePropertyStore';
import FormSelectObject from '../../Form/FormSelectObject';

const CreateApplicationModalField = () => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);

  const selectedProperty = usePropertyStore((state) => state.selectedProperty);

  const property_id = selectedProperty.property_id;

  const areas = useFetchArea(property_id);

  const areaOptions = areas.data
    ? areas.data.map((area) => ({
        value: area.id,
        label: area.name,
      }))
    : [];

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      area_id: '',
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
    setCreateModalOpen(false);
    await createApplication(applications.area_id, applications);
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
            <FormSelectObject
              type="select"
              name="area_id"
              labelText="Selecionar área"
              control={control}
              options={areaOptions}
            />
            <FormRow
              type="text"
              name="used_product"
              labelText="Produto Usado"
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
              labelText="Quantidade produto usado / Kg"
              placeholder="10000 Kg"
              control={control}
              hasError={JSON.stringify(errors.quantity?.message)}
            />
            <FormRow
              type="number"
              name="application_time"
              labelText="Tempo de colheita h"
              placeholder="10 h"
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
export default CreateApplicationModalField;
