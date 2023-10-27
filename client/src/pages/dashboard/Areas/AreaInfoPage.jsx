import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getOneArea } from '../../../features/area/areaSlice';
// import AreaInfo from '../../../assets/wrappers/AreaInfo';
// import Crop from '../../fieldNotebbok/Crops/Crop';
import { getAllCrops } from '../../../features/crop/cropSlice';
import {
  Accordion,
  Button,
  DarkThemeToggle,
  Flowbite,
  Modal,
  Table,
} from 'flowbite-react';
import Crop from '../../fieldNotebbok/Crops/Crop';
import CreateCrop from '../../fieldNotebbok/Crops/CreateCrop';

function AreaInfoPage() {
  const dispatch = useDispatch();
  const selectedAreaData = useSelector((state) => state.area.selectedAreaData);
  const crop = useSelector((store) => store.crop);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const property_id = searchParams.get('property_id');
  const area_id = searchParams.get('area_id');

  const [openModal, setOpenModal] = useState();
  const emailInputRef = useRef(null);
  const props = { openModal, setOpenModal, emailInputRef };

  useEffect(() => {
    dispatch(getOneArea({ property_id, area_id }));
    if (area_id) {
      dispatch(getAllCrops(area_id));
    }
  }, [dispatch, property_id, area_id]);

  const cropArray = crop.crops.data || [];

  return (
    <Flowbite>
      {/* <DarkThemeToggle /> */}
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title style={{ color: 'black' }}>
            {selectedAreaData.name}
          </Accordion.Title>
          <Accordion.Content>
            <Table striped style={{ color: 'black' }}>
              <Table.Body>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <h6>
                      <strong>Espécie plantada - </strong>{' '}
                      {selectedAreaData.species}
                    </h6>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <h6>
                      <strong>Variedade plantada - </strong>{' '}
                      {selectedAreaData.variety}
                    </h6>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <h6>
                      <strong>Sistema de condução - </strong>{' '}
                      {selectedAreaData.driving_system}
                    </h6>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <h6>
                      <strong>Tipo de porta enxerto - </strong>
                      {selectedAreaData.rookstock_type}
                    </h6>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <h6>
                      <strong>Área cultivada - </strong>{' '}
                      {selectedAreaData.cultivated_area}
                    </h6>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <h6>
                      <strong>Coordenadas Geográficas - </strong>
                      {selectedAreaData.geographic_coordinates}
                    </h6>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <h6>
                      <strong>Coordenadas Geográficas - </strong>
                      {selectedAreaData.geographic_coordinates}
                    </h6>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <h6>
                      <strong>Data de implantação - </strong>
                      {selectedAreaData.implementation_date}
                    </h6>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <h6>
                      <strong>Número de fileiras - </strong>
                      {selectedAreaData.number_rows}
                    </h6>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <h6>
                      <strong>Número de fileiras - </strong>
                      {selectedAreaData.number_rows}
                    </h6>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <h6>
                      <strong>Distância entre fileiras - </strong>
                      {selectedAreaData.distance_between_rows}
                    </h6>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <h6>
                      <strong>Distância entre plantas - </strong>
                      {selectedAreaData.distance_between_plants}
                    </h6>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <h6>
                      <strong>Número de plantas- </strong>
                      {selectedAreaData.number_plants}
                    </h6>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title style={{ color: 'black' }}>
            Colheitas
          </Accordion.Title>
          <Accordion.Content>
            <Table className="mb-4">
              <Table.Body>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <Button
                      gradientDuoTone="greenToBlue"
                      outline
                      onClick={() => props.setOpenModal('initial-focus')}
                    >
                      + Adicionar nova colheita
                    </Button>
                    <Modal
                      show={props.openModal === 'initial-focus'}
                      size="md"
                      popup
                      onClose={() => props.setOpenModal(undefined)}
                      initialFocus={props.emailInputRef}
                    >
                      <Modal.Header />
                      <Modal.Body>
                        <CreateCrop />
                      </Modal.Body>
                    </Modal>
                  </Table.Cell>
                  <Table.Cell>
                    <h6>
                      {cropArray.length} Colheita{cropArray.length > 1 && 's'}{' '}
                      encontrada
                      {cropArray.length > 1 && 's'}{' '}
                    </h6>
                  </Table.Cell>
                  {/* <Table.Cell>
              <DarkThemeToggle />
            </Table.Cell> */}
                </Table.Row>
              </Table.Body>
            </Table>
            <Table striped style={{ color: 'black' }}>
              <Table.Head>
                <Table.HeadCell>Nome da Colheita</Table.HeadCell>
                <Table.HeadCell>Quantidade Colhida</Table.HeadCell>
                <Table.HeadCell>Data da colheita</Table.HeadCell>
                <Table.HeadCell>Tempo de colheita</Table.HeadCell>
                <Table.HeadCell>Editar</Table.HeadCell>
                <Table.HeadCell>Excluir</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {cropArray.map((crop) => {
                  return <Crop key={crop.id} {...crop} />;
                })}
              </Table.Body>
            </Table>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </Flowbite>
    //     <div className="area-atividaes-info">
    //       <h2>Atividades</h2>
    //       <hr />
    //       <h2>Colheitas</h2>
    //       <div className="jobs">
    //         {cropArray.map((crop) => {
    //           return <Crop key={crop.id} {...crop} />;
    //         })}
    //       </div>
    //     </div>
    //   </div>
    // </AreaInfo>
  );
}

export default AreaInfoPage;
