import { Link } from 'react-router-dom';
import PropertyWrapper from '../../../assets/wrappers/PropertyWrapper';
import { useDispatch } from 'react-redux';
import {
  deleteCrop,
  setEditCrop,
  getAllCrops,
} from '../../../features/crop/cropSlice';
const Crop = ({ area_id, id, name, quantity, crop_date, crop_time }) => {
  const dispatch = useDispatch();

  const handleDeleteCrop = ({ id, area_id }) => {
    dispatch(deleteCrop({ id, area_id }));
    dispatch(getAllCrops(area_id));
  };

  return (
    <PropertyWrapper>
      <div className="info">
        <h2>{name}</h2>
        <h2>Quantidade colhida: {quantity} Kg</h2>
        <h2>Data da colheita: {crop_date} Kg</h2>
        <h2>Tempo de colheita: {crop_time} horas</h2>
      </div>
      <div className="info"></div>

      <footer>
        <div className="actions">
          <Link
            to="/create-crop"
            className="btn edit-btn"
            onClick={() =>
              dispatch(
                setEditCrop({
                  area_id,
                  id,
                  name,
                  quantity,
                  crop_date,
                  crop_time,
                }),
              )
            }
          >
            Editar
          </Link>
          <button
            type="button"
            className="btn delete-btn"
            onClick={() => handleDeleteCrop({ id, area_id })}
          >
            Excluir
          </button>
        </div>
      </footer>
    </PropertyWrapper>
  );
};
export default Crop;
