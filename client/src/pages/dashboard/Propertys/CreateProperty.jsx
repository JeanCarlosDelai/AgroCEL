import { FormRow } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  handleChange,
  clearValues,
  createProperty,
  editProperty,
} from '../../../features/property/propertySlice';
import { Button, Flowbite } from 'flowbite-react';
import { LiaBroomSolid } from 'react-icons/lia';
import { AiOutlineSend } from 'react-icons/ai';

const CreateProperty = () => {
  const {
    isLoading,
    property_id,
    name,
    city,
    state,
    total_area,
    cultivated_area,
    isEditing,
  } = useSelector((store) => store.property);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !city) {
      toast.error('Por favor prencha todos os campos');
      return;
    }
    if (isEditing) {
      dispatch(
        editProperty({
          property_id,
          property: {
            name,
            city,
            state,
            total_area,
            cultivated_area,
          },
        }),
      );
      return;
    }
    dispatch(
      createProperty({
        name,
        city,
        state,
        total_area,
        cultivated_area,
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
        <h3>{isEditing ? 'Editar Propriedade' : 'Adicionar Propriedade'}</h3>
        <div>
          <FormRow
            type="text"
            name="name"
            labelText="Nome da propriedade"
            value={name}
            handleChange={handlePropertyInput}
          />
          <FormRow
            type="text"
            name="city"
            labelText="Cidade da propriedade"
            value={city}
            handleChange={handlePropertyInput}
          />
          <FormRow
            type="text"
            name="state"
            labelText="Estado da propriedade"
            value={state}
            handleChange={handlePropertyInput}
          />
          <FormRow
            type="number"
            name="total_area"
            labelText="Área total da propriedade"
            value={total_area}
            handleChange={handlePropertyInput}
          />
          <FormRow
            type="number"
            name="cultivated_area"
            labelText="Área total cultivada da propriedade"
            value={cultivated_area}
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
export default CreateProperty;
