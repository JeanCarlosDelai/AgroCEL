import { useEffect } from 'react';
import Property from './Property';
import PropertysContainerWrapper from '../../../assets/wrappers/PropertysContainerWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '../../../components';
import { getAllPropertys } from '../../../features/property/propertySlice';
import { Link } from 'react-router-dom';

const PropertysContainer = () => {
  const { propertys, isLoading } = useSelector((store) => store.property);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPropertys());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const propertyArray = propertys.data || [];

  if (propertyArray.length === 0) {
    return (
      <PropertysContainerWrapper>
        <Link to="/create-property" className="btn create-btn">
          Criar nova propriedade
        </Link>
        <h2>Sem Viagens para mostrar...</h2>
      </PropertysContainerWrapper>
    );
  }

  return (
    <PropertysContainerWrapper>
      <Link to="/create-property" className="btn create-btn">
        Criar nova propriedade
      </Link>
      <h5>
        {propertyArray.length} Propriedade{propertyArray.length > 1 && 's'}{' '}
        encontrada{propertyArray.length > 1 && 's'}{' '}
      </h5>
      <div className="jobs">
        {propertyArray.map((property) => {
          return <Property key={property.id} {...property} />;
        })}
      </div>
    </PropertysContainerWrapper>
  );
};
export default PropertysContainer;
