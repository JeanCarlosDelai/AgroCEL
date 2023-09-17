import { FormRow } from '../../../components';
import DashboardFormPage from '../../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  handleChange,
  clearValues,
  createProperty,
  editProperty,
} from '../../../features/property/propertySlice';
import { useEffect } from 'react';
const CreateProperty = () => {
  const {
    isLoading,
    name,
    city,
    state,
    total_area,
    cultivated_area,
    isEditing,
    propertyId,
  } = useSelector((store) => store.property);
  const { user } = useSelector((store) => store.user);
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
          propertyId,
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
    <DashboardFormPage>
      <form className="form">
        <h3>{isEditing ? 'Editar Propriedade' : 'Adicionar Propriedade'}</h3>
        <div className="form-center">
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
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              Limpar
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Enviar
            </button>
          </div>
        </div>
      </form>
    </DashboardFormPage>
  );
};
export default CreateProperty;
