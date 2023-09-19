import { Link } from 'react-router-dom';
import PropertyWrapper from '../../../assets/wrappers/PropertyWrapper';
import { useDispatch } from 'react-redux';
import {
  deleteArea,
  setEditArea,
  getAllAreas,
} from '../../../features/area/areaSlice';
const Area = ({
  id,
  name,
  property_id,
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
}) => {
  const dispatch = useDispatch();

  const handleDeleteArea = ({ id, property_id }) => {
    dispatch(deleteArea({ id, property_id }));
    dispatch(getAllAreas(property_id));
  };

  return (
    <PropertyWrapper>
      <div className="info">
        <h2>{name}</h2>
      </div>
      <div className="info">
        <h4>
          {species} - {variety}
        </h4>
      </div>
      <div className="info">
        <h4>Área cultivada: {cultivated_area} ha </h4>
      </div>

      <footer>
        <div className="actions">
          <Link
            to="/create-area"
            className="btn edit-btn"
            onClick={() =>
              dispatch(
                setEditArea({
                  areaId: id,
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
                }),
              )
            }
          >
            Editar
          </Link>
          <button
            type="button"
            className="btn delete-btn"
            onClick={() => handleDeleteArea({ id, property_id })}
          >
            Excluir
          </button>
          {/* <button
            type="button"
            className="btn select-btn"
            onClick={handleSelectProperty}
          >
            Selecionar
          </button> */}
        </div>
      </footer>
    </PropertyWrapper>
  );
};
export default Area;
