import { Link } from 'react-router-dom';
import PropertyWrapper from '../../../assets/wrappers/PropertyWrapper';
import { useDispatch } from 'react-redux';
import { deleteArea, setEditArea } from '../../../features/area/areaSlice';
const Area = ({
  id,
  name,
  property_id,
  species,
  driving_system,
  rookstock_type,
  cultivated_area,
  geographic_coordinates,
  implementation_date,
  number_rows,
  distance_between_rows,
  distance_between_plants,
  number_plants,
}) => {
  const dispatch = useDispatch();

  // const handleSelectProperty = () => {
  //   addPropertyToLocalStorage(id, name);
  //   window.location.reload();
  // };

  return (
    <PropertyWrapper>
      <div className="info">
        <h2>{name}</h2>
      </div>
      <div className="info">
        <h4>Área cultivada:{cultivated_area} </h4>
      </div>
      <div className="info">
        <h4>Variedade: {species} </h4>
      </div>
      <div className="info">
        <h4>Sistema de condução: {driving_system} </h4>
      </div>
      <div className="info">
        <h4>Tipo de porta enxerto: {rookstock_type} </h4>
      </div>
      <div className="info">
        <h4>Localização: {geographic_coordinates} </h4>
      </div>
      <div className="info">
        <h4>Data de implementação: {implementation_date} </h4>
      </div>
      <hr />
      <div className="info">
        <h4>Número de fileiras: {number_rows} </h4>
      </div>
      <div className="info">
        <h4>Distancia entre fileiras: {distance_between_rows}m </h4>
      </div>
      <div className="info">
        <h4>Distancia entre plantas: {distance_between_plants}m </h4>
      </div>
      <div className="info">
        <h4>Número de plantas: {number_plants}</h4>
      </div>

      {/* <footer>
        <div className="actions">
          <Link
            to="/create-property"
            className="btn edit-btn"
            onClick={() =>
              dispatch(
                setEditProperty({
                  propertyId: id,
                  name,
                  city,
                  state,
                  total_area,
                  cultivated_area,
                }),
              )
            }
          >
            Editar
          </Link>
          <button
            type="button"
            className="btn delete-btn"
            onClick={() => dispatch(deleteProperty(id))}
          >
            Excluir
          </button>
          <button
            type="button"
            className="btn select-btn"
            onClick={handleSelectProperty}
          >
            Selecionar
          </button>
        </div>
      </footer> */}
    </PropertyWrapper>
  );
};
export default Area;
