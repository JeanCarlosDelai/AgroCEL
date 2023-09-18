import { Link } from 'react-router-dom';
import PropertyWrapper from '../../../assets/wrappers/PropertyWrapper';
import { useDispatch } from 'react-redux';
import {
  deleteProperty,
  setEditProperty,
} from '../../../features/property/propertySlice';
import { addPropertyToLocalStorage } from '../../../utils/localStorage';
const Property = ({ id, name, total_area, cultivated_area, city, state }) => {
  const dispatch = useDispatch();

  const handleSelectProperty = () => {
    addPropertyToLocalStorage(id, name);
    window.location.reload();
  };

  return (
    <PropertyWrapper>
      <div className="info">
        <h2>{name}</h2>
      </div>
      <div className="info">
        <h3>
          {city} - {state}
        </h3>
      </div>
      <div className="info">
        <h4>Área total:{total_area} </h4>
      </div>
      <div className="info">
        <h4>Área cultivada:{cultivated_area} </h4>
      </div>

      <footer>
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
      </footer>
    </PropertyWrapper>
  );
};
export default Property;
