import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateCropSchema } from '../../../schemas/CreateCropSchema';
import OpenCloseModal from '../../modal/OpenCloseModal';
import FormRow from '../../Form/FormRow';
import ClearButtonForm from '../../Buttons/ClearButtonForm';
import SubmitButton from '../../Buttons/SubmitButton';
import { createCrop } from '../../../queries/crops/crops';
import FormSelectObject from '../../Form/FormSelectObject';
import usePropertyStore from '../../../store/propertys/usePropertyStore';
import { useFetchArea } from '../../../queries/areas/areas';

const CreateCropModalField = () => {
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
      name: '',
      quantity: '',
      crop_date: new Date().toISOString().split('T')[0],
      crop_time: '',
    },
    resolver: yupResolver(CreateCropSchema),
  });

  function openCreateModal() {
    setCreateModalOpen(true);
  }

  function closeCreateModal() {
    setCreateModalOpen(false);
  }
  const handlerCreate = async (crops) => {
    setCreateModalOpen(false);
    await createCrop(crops);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openCreateModal}
        closeModal={closeCreateModal}
        modalName={'Adicionar colheita'}
        modalButton={' + Adicionar colheita'}
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
              name="name"
              labelText="Nome da colheita"
              placeholder="Nome"
              control={control}
              hasError={JSON.stringify(errors.name?.message)}
            />
            <FormRow
              type="number"
              name="quantity"
              labelText="Quantidade colhida"
              placeholder="Quantidade"
              control={control}
              hasError={JSON.stringify(errors.quantity?.message)}
            />
            <FormRow
              type="date"
              name="crop_date"
              labelText="Data da colheita"
              control={control}
              hasError={JSON.stringify(errors.crop_date?.message)}
            />
            <FormRow
              type="number"
              name="crop_time"
              labelText="Tempo de colheita"
              placeholder="Tempo"
              control={control}
              hasError={JSON.stringify(errors.crop_time?.message)}
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
export default CreateCropModalField;
