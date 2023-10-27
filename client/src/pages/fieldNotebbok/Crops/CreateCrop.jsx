import { FormRow, FormSelectObject, Loading } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import {
  handleChange,
  clearValues,
  createCrop,
  editCrop,
} from '../../../features/crop/cropSlice';
import { getAllAreas } from '../../../features/area/areaSlice';
import { Button, Flowbite, Label } from 'flowbite-react';
import { AiOutlineSend } from 'react-icons/ai';
import { LiaBroomSolid } from 'react-icons/lia';

const CreateCrop = () => {
  const {
    isLoading,
    area_id,
    id,
    name,
    crop_date,
    quantity,
    crop_time,
    isEditing,
  } = useSelector((store) => store.crop);

  const { areas } = useSelector((store) => store.area);

  const dispatch = useDispatch();

  const [crop_dateUse = crop_date, setCrop_date] = useState('');

  const handleDateChange = (e) => {
    setCrop_date(e.target.value);
  };

  useEffect(() => {
    const propertyId = localStorage.getItem('propertyId');
    if (propertyId) {
      dispatch(getAllAreas(JSON.parse(propertyId)));
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const areaArray = areas.data || [];

  const areaOptions = areaArray.map((area) => ({
    value: area.id,
    label: area.name,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !quantity) {
      toast.error('Por favor prencha todos os campos');
      return;
    }
    if (isEditing) {
      dispatch(
        editCrop({
          crop_id: id,
          area_id,
          area: {
            name,
            quantity,
            crop_date,
            crop_time,
          },
        }),
      );
      return;
    }
    dispatch(
      createCrop({
        area_id,
        crop: {
          name,
          quantity,
          crop_date: crop_dateUse,
          crop_time,
        },
      }),
    );
  };

  const handlePropertyInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  return (
    <Flowbite>
      <form className="flex max-w-md flex-col gap-4">
        <h3>{isEditing ? 'Editar Colheita' : 'Adicionar Colheita'}</h3>
        <div>
          <FormRow
            type="text"
            name="name"
            labelText="Nome da Colheita"
            value={name}
            handleChange={handlePropertyInput}
          />
          <FormRow
            type="text"
            name="quantity"
            labelText="Quantidade"
            value={quantity}
            handleChange={handlePropertyInput}
          />
          <FormSelectObject
            type="select"
            name="area_id"
            labelText="Área"
            value={area_id}
            handleChange={handlePropertyInput}
            options={areaOptions}
          />
          <div>
            <Label htmlFor="crop_date">Data da colheita</Label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="date"
              name="crop_date"
              value={crop_dateUse}
              onChange={handleDateChange}
            />
          </div>
          <FormRow
            type="number"
            name="crop_time"
            labelText="Tempo de colheita"
            value={crop_time}
            handleChange={handlePropertyInput}
          />
        </div>
        <Button
          type="button"
          gradientDuoTone="greenToBlue"
          outline
          onClick={() => dispatch(clearValues())}
        >
          <LiaBroomSolid className="mr-2" /> Limpar
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
          gradientDuoTone="greenToBlue"
          outline
        >
          <AiOutlineSend className="mr-2" />
          Enviar
        </Button>
      </form>
    </Flowbite>
  );
};
export default CreateCrop;
