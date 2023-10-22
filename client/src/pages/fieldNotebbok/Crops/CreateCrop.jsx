import { FormRow, FormSelectObject, Loading } from '../../../components';
import DashboardFormPage from '../../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import {
  handleChange,
  clearValues,
  createCrop,
  editCrop,
} from '../../../features/crop/cropSlice';
import { getAllAreas } from '../../../features/area/areaSlice';

const CreateCrop = () => {
  const {
    isLoading,
    area_id,
    id,
    name,
    quantity,
    crop_date,
    crop_time,
    isEditing,
  } = useSelector((store) => store.crop);

  const { areas } = useSelector((store) => store.area);

  const dispatch = useDispatch();

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
    console.log(isEditing);
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
          crop_date,
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
    <DashboardFormPage>
      <form className="form">
        <h3>{isEditing ? 'Editar Colheita' : 'Adicionar Colheita'}</h3>
        <div className="form-center">
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
          <FormRow
            type="text"
            name="crop_date"
            labelText="Data da colheita"
            value={crop_date}
            handleChange={handlePropertyInput}
          />
          <FormRow
            type="number"
            name="crop_time"
            labelText="Tempo de colheita"
            value={crop_time}
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
export default CreateCrop;
