import { useEffect } from 'react';
import Property from './Property';
import propertysContainer from '../../../assets/wrappers/PropertysContainer';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '../../../components';
import { getAllPropertys } from '../../../features/AllPropertys/allPropertySlice';

const PropertysContainer = () => {
  const { propertys, isLoading } = useSelector((store) => store.allPropertys);
  const dispatch = useDispatch();
  console.log(propertys);
  useEffect(() => {
    dispatch(getAllPropertys());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  // if (propertys.length === 0) {
  //   return (
  //     <Wrapper>
  //       <h2>Sem Viagens para mostrar...</h2>
  //     </Wrapper>
  //   );
  // }
  const propertyArray = propertys.data;

  return (
    <propertysContainer>
      <>
        <h5>{propertyArray.length} Propriedades encontradas</h5>
        <div className="jobs">
          {propertyArray.map((property, index) => {
            return <Property key={property.id} {...property} />;
          })}
        </div>
        <p>Propriedade</p>
      </>
    </propertysContainer>
  );
};
export default PropertysContainer;
