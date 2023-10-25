import { FormRow, FormSelect, DateInput } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
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
    geographic_coordinates,
    number_rows,
    distance_between_rows,
    distance_between_plants,
    number_plants,
    isEditing,
  } = useSelector((store) => store.area);
  const property_id = JSON.parse(localStorage.getItem('propertyId'));
  const dispatch = useDispatch();

  const [implementation_date, setImplementation_date] = useState(null);

  console.log(implementation_date);
  const handleDateChange = (date) => {
    setImplementation_date(date);
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
          implementation_date,
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
          {/* <DatepickerComponent /> */}
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
          <div>
            <Label>Data de implementação</Label>
            <DateInput
              placeholder={'ola'}
              value={implementation_date}
              onChange={handleDateChange}
              name="implementation_date"
              type="date"
            />
          </div>
          {/* <Datepicker value={implementation_date} /> */}
          {/* <FormRow
            type="text"
            name="implementation_date"
            labelText="Data de implementação"
            value={implementation_date}
            handleChange={handlePropertyInput}
          /> */}
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
          <LiaBroomSolid /> Limpar
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
          gradientDuoTone="greenToBlue"
          outline
        >
          <AiOutlineSend />
          Enviar
        </Button>
      </form>
    </Flowbite>
  );
};
export default CreateArea;
