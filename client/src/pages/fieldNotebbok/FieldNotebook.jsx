import { useEffect } from 'react';
import PropertysContainerWrapper from '../../assets/wrappers/PropertysContainerWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '../../components';
import { getAllAreas } from '../../features/area/areaSlice';
import { Link } from 'react-router-dom';

const FildsNotebookContainer = () => {
  const { isLoading } = useSelector((store) => store.area);
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

  // const areaArray = areas.data || [];

  // if (areaArray.length === 0) {
  //   return (
  //     <PropertysContainerWrapper>
  //       <Link to="/create-area" className="btn create-btn">
  //         Criar nova Area
  //       </Link>
  //       <h2>Sem Areas para mostrar...</h2>
  //     </PropertysContainerWrapper>
  //   );
  // }

  return (
    <PropertysContainerWrapper>
      <Link to="/create-crop" className="btn create-btn">
        Adicionar nova colheita
      </Link>
      <br></br>
      <Link to="/create-application" className="btn create-btn">
        Adicionar nova aplicação
      </Link>
      <br></br>
      <Link to="/other-activities" className="btn create-btn">
        Adicionar Manejo
      </Link>
    </PropertysContainerWrapper>
  );
};
export default FildsNotebookContainer;
