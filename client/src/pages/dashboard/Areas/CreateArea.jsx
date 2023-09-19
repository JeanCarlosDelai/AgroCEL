import { FormRow } from '../../../components';
import DashboardFormPage from '../../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  handleChange,
  clearValues,
  createArea,
  editArea,
} from '../../../features/area/areaSlice';
import { getPropertyIdFromLocalStorage } from '../../../utils/localStorage';
// const property_id = getPropertyIdFromLocalStorage();
const CreateArea = () => {
  const {
    isLoading,
    areaId,
    property_id,
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
    isEditing,
  } = useSelector((store) => store.area);
  // property_id=
  const dispatch = useDispatch();
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
    <DashboardFormPage>
      <form className="form">
        <h3>{isEditing ? 'Editar Area' : 'Adicionar Area'}</h3>
        <div className="form-center">
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
          <FormRow
            type="text"
            name="variety"
            labelText="Nome da variedade"
            value={variety}
            handleChange={handlePropertyInput}
          />
          <FormRow
            type="text"
            name="driving_system"
            labelText="Nome do sistema de condução"
            value={driving_system}
            handleChange={handlePropertyInput}
          />
          <FormRow
            type="text"
            name="rookstock_type"
            labelText="Nome do tipo de porta enxerto"
            value={rookstock_type}
            handleChange={handlePropertyInput}
          />
          <FormRow
            type="text"
            name="geographic_coordinates"
            labelText="Coordenadas Geográficas"
            value={geographic_coordinates}
            handleChange={handlePropertyInput}
          />
          <FormRow
            type="text"
            name="implementation_date"
            labelText="Data de implementação"
            value={implementation_date}
            handleChange={handlePropertyInput}
          />
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
export default CreateArea;
