import { useEffect } from 'react';
import Area from './Area';
import PropertysContainerWrapper from '../../../assets/wrappers/PropertysContainerWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '../../../components';
import { getAllAreas } from '../../../features/area/areaSlice';
import { Link } from 'react-router-dom';

const AreasContainer = () => {
  const { areas, isLoading } = useSelector((store) => store.area);
  const dispatch = useDispatch();
  console.log(areas);
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

  if (areaArray.length === 0) {
    return (
      <PropertysContainerWrapper>
        <Link to="/create-area" className="btn create-btn">
          Criar nova Area
        </Link>
        <h2>Sem Areas para mostrar...</h2>
      </PropertysContainerWrapper>
    );
  }

  return (
    <PropertysContainerWrapper>
      <Link to="/create-area" className="btn create-btn">
        Criar nova Area
      </Link>
      <h5>
        {areaArray.length} Area{areaArray.length > 1 && 's'} encontrada
        {areaArray.length > 1 && 's'}{' '}
      </h5>
      <div className="jobs">
        {areaArray.map((area) => {
          return <Area key={area.id} {...area} />;
        })}
      </div>
    </PropertysContainerWrapper>
  );
};
export default AreasContainer;
