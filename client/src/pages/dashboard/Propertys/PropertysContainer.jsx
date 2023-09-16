import { useEffect } from 'react';
import Property from './Property';
import propertysContainer from '../../../assets/wrappers/PropertysContainer';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '../../../components';
import { getAllPropertys } from '../../../features/AllPropertys/allPropertySlice';

const PropertysContainer = () => {
  const { propertys, isLoading, totalPropertys } = useSelector(
    (store) => store.allPropertys,
  );
  const dispatch = useDispatch();

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

  return (
    <propertysContainer>
      <>
        <h5>{totalPropertys} Propriedades encontradas</h5>
        <div className="jobs">
          {propertys.map((property, index) => {
            return <Property key={index} {...property} />;
          })}
        </div>
        <p>Propriedade</p>
      </>
    </propertysContainer>
  );
};
export default PropertysContainer;
