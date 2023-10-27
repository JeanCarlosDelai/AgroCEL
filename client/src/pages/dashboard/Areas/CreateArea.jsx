import { FormRow, FormSelect } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  handleChange,
  clearValues,
  createArea,
  editArea,
} from '../../../features/area/areaSlice';
import { DrivingSystems } from '../../../Arrays/DrivingSystems';
import { AreaVarietys } from '../../../Arrays/AreaVarietys';
import { RookstockTypes } from '../../../Arrays/RookstockTypes';
import { Button, Flowbite, Datepicker, Label } from 'flowbite-react';
import { LiaBroomSolid } from 'react-icons/lia';
import { AiOutlineSend } from 'react-icons/ai';
import { useState } from 'react';

const CreateArea = () => {
  const {
    isLoading,
    areaId,
    name,
    species,
    variety,
    driving_system,
    rookstock_type,
    cultivated_area,
    implementation_date,
    geographic_coordinates,
    number_rows,
    distance_between_rows,
    distance_between_plants,
    number_plants,
    isEditing,
  } = useSelector((store) => store.area);
  const property_id = JSON.parse(localStorage.getItem('propertyId'));
  const dispatch = useDispatch();

  const [
    implementation_date_use = implementation_date,
    setImplementation_date,
  ] = useState('');

  const handleDateChange = (e) => {
    setImplementation_date(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !species) {
      toast.error('Por favor prencha todos os campos');
      return;
    }
    if (isEditing) {
      dispatch(
        editArea({
          property_id,
          areaId,
          area: {
            name,
            species,
            variety,
            driving_system,
            rookstock_type,
            cultivated_area,
            geographic_coordinates,
            implementation_date,
            number_rows,
            distance_between_rows,
            distance_between_plants,
            number_plants,
          },
        }),
      );
      return;
    }
    dispatch(
      createArea({
        property_id,
        area: {
          name,
          species,
          variety,
          driving_system,
          rookstock_type,
          cultivated_area,
          geographic_coordinates,
          implementation_date: implementation_date_use,
          number_rows,
          distance_between_rows,
          distance_between_plants,
          number_plants,
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
        <h3>{isEditing ? 'Editar Area' : 'Adicionar Area'}</h3>
        <div>
          <FormRow
            type="text"
            name="name"
            labelText="Nome da Area"
            value={name}
            handleChange={handlePropertyInput}
          />
          <FormRow
            type="number"
            name="cultivated_area"
            labelText="Área cultivada"
            value={cultivated_area}
            handleChange={handlePropertyInput}
          />
          <FormRow
            type="text"
            name="species"
            labelText="Nome da Espécie"
            value={species}
            handleChange={handlePropertyInput}
          />
          <FormSelect
            type="select"
            name="variety"
            labelText="Nome da variedade"
            value={variety}
            handleChange={handlePropertyInput}
            options={AreaVarietys}
          />
          <FormSelect
            type="select"
            name="driving_system"
            labelText="Sistema de condução"
            value={driving_system}
            handleChange={handlePropertyInput}
            options={DrivingSystems}
          />
          <FormSelect
            type="select"
            name="rookstock_type"
            labelText="Tipo de porta enxerto"
            value={rookstock_type}
            handleChange={handlePropertyInput}
            options={RookstockTypes}
          />
          <FormRow
            type="text"
            name="geographic_coordinates"
            labelText="Coordenadas Geográficas"
            value={geographic_coordinates}
            handleChange={handlePropertyInput}
          />
          <Label htmlFor="">Data de implantação</Label>
          <div>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="date"
              name="implementation_date"
              value={implementation_date_use}
              onChange={handleDateChange}
            />
          </div>
          <FormRow
            type="number"
            name="number_rows"
            labelText="Número de fileiras"
            value={number_rows}
            handleChange={handlePropertyInput}
          />
          <FormRow
            type="text"
            name="distance_between_rows"
            labelText="Distância entre fileiras"
            value={distance_between_rows}
            handleChange={handlePropertyInput}
          />
          <FormRow
            type="text"
            name="distance_between_plants"
            labelText="Distância entre plantas"
            value={distance_between_plants}
            handleChange={handlePropertyInput}
          />
          <FormRow
            type="text"
            name="number_plants"
            labelText="Número total de plantas"
            value={number_plants}
            handleChange={handlePropertyInput}
          />
        </div>
        <Button
          type="button"
          onClick={() => dispatch(clearValues())}
          gradientDuoTone="greenToBlue"
          outline
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
export default CreateArea;
