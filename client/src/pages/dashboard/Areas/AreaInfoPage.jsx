import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getOneArea } from '../../../features/area/areaSlice';
import AreaInfo from '../../../assets/wrappers/AreaInfo';
import Crop from '../../fieldNotebbok/Crops/Crop';
import { getAllCrops } from '../../../features/crop/cropSlice';

function AreaInfoPage() {
  const dispatch = useDispatch();
  const selectedAreaData = useSelector((state) => state.area.selectedAreaData);
  const crop = useSelector((store) => store.crop);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const property_id = searchParams.get('property_id');
  const area_id = searchParams.get('area_id');

  useEffect(() => {
    dispatch(getOneArea({ property_id, area_id }));
    if (area_id) {
      dispatch(getAllCrops(area_id));
    }
  }, [dispatch, property_id, area_id]);

  const cropArray = crop.crops.data || [];

  return (
    <AreaInfo>
      <div className="area-info">
        <h2>{selectedAreaData.name}</h2>
        <table className="table-area-info">
          <tbody>
            <tr>
              <td>
                <p>Espécie plantada: </p>
              </td>
              <td>
                <p>{selectedAreaData.species}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Variedade plantada: </p>
              </td>
              <td>
                <p>{selectedAreaData.variety}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Sistema de condução: </p>
              </td>
              <td>
                <p>{selectedAreaData.driving_system}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Tipo de porta enxerto: </p>
              </td>
              <td>
                <p>{selectedAreaData.rookstock_type}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Área cultivada: </p>
              </td>
              <td>
                <p>{selectedAreaData.cultivated_area}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Coordenadas Geográficas: </p>
              </td>
              <td>
                <p>{selectedAreaData.geographic_coordinates}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Data de implementação</p>
              </td>
              <td>
                <p>{selectedAreaData.implementation_date}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Número de fileiras</p>
              </td>
              <td>
                <p>{selectedAreaData.number_rows}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Distância entre fileiras</p>
              </td>
              <td>
                <p>{selectedAreaData.distance_between_rows}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Distância entre plantas</p>
              </td>
              <td>
                <p>{selectedAreaData.distance_between_plants}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Número de plantas</p>
              </td>
              <td>
                <p>{selectedAreaData.number_plants}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="area-atividaes-info">
          <h2>Atividades</h2>
          <hr />
          <h2>Colheitas</h2>
          <div className="jobs">
            {cropArray.map((crop) => {
              return <Crop key={crop.id} {...crop} />;
            })}
          </div>
        </div>
      </div>
    </AreaInfo>
  );
}

export default AreaInfoPage;
