import { useEffect } from 'react';
import PropertysContainerWrapper from '../../assets/wrappers/PropertysContainerWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '../../components';
import { getAllAreas } from '../../features/area/areaSlice';
import { Link } from 'react-router-dom';
import { Table, Flowbite, Button } from 'flowbite-react';

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
    <Flowbite>
      <Table>
        <Table.Cell>
          <Link to="/create-crop">
            <Button gradientDuoTone="greenToBlue" outline>
              + Adicionar nova colheita
            </Button>
          </Link>
        </Table.Cell>
      </Table>
      <br />
      <Table>
        <Table.Cell>
          <Link to="/create-application">
            <Button gradientDuoTone="greenToBlue" outline>
              + Adicionar nova aplicação
            </Button>
          </Link>
        </Table.Cell>
      </Table>
      <br />
      <Table>
        <Table.Cell>
          <Link to="/other-activities">
            <Button gradientDuoTone="greenToBlue" outline>
              + Adicionar novo manejo
            </Button>
          </Link>
        </Table.Cell>
      </Table>
    </Flowbite>
  );
};
export default FildsNotebookContainer;
