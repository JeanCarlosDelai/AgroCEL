import { useEffect, useRef, useState } from 'react';
import Area from './Area';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '../../../components';
import { getAllAreas } from '../../../features/area/areaSlice';
import { Link } from 'react-router-dom';
import {
  Table,
  Button,
  Flowbite,
  Modal,
  DarkThemeToggle,
} from 'flowbite-react';
import CreateArea from './CreateArea';

const AreasContainer = () => {
  const { areas, isLoading } = useSelector((store) => store.area);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState();
  const emailInputRef = useRef(null);
  const props = { openModal, setOpenModal, emailInputRef };

  useEffect(() => {
    const propertyId = localStorage.getItem('propertyId');
    if (propertyId) {
      dispatch(getAllAreas(JSON.parse(propertyId)));
    }
  }, []);

  const areaArray = areas.data || [];

  // if (areaArray.length === 0) {
  //   return (
  //     <Table>
  //       <Table.Body>
  //         <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
  //           <Table.Cell>
  //             <Button
  //               gradientDuoTone="greenToBlue"
  //               outline
  //               onClick={() => props.setOpenModal('initial-focus')}
  //             >
  //               + Adicionar nova área
  //             </Button>
  //             <Modal
  //               show={props.openModal === 'initial-focus'}
  //               size="md"
  //               popup
  //               onClose={() => props.setOpenModal(undefined)}
  //               initialFocus={props.emailInputRef}
  //             >
  //               <Modal.Header />
  //               <Modal.Body>
  //                 <CreateArea />
  //               </Modal.Body>
  //             </Modal>
  //           </Table.Cell>
  //           <Table.Cell>
  //             <h2>Sem áreas para mostrar</h2>
  //           </Table.Cell>
  //         </Table.Row>
  //       </Table.Body>
  //     </Table>
  //   );
  // }

  return (
    <Flowbite>
      <Table>
        <Table.Body>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>
              <Button
                gradientDuoTone="greenToBlue"
                outline
                onClick={() => props.setOpenModal('initial-focus')}
              >
                + Adicionar nova área
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
                  <CreateArea />
                </Modal.Body>
              </Modal>
            </Table.Cell>
            <Table.Cell>
              <h6>
                {areaArray.length} Área{areaArray.length > 1 && 's'} encontrada
                {areaArray.length > 1 && 's'}{' '}
              </h6>
            </Table.Cell>
            {/* <Table.Cell>
              <DarkThemeToggle />
            </Table.Cell> */}
          </Table.Row>
        </Table.Body>
      </Table>
      <br />

      <Table hoverable>
        <Table.Head border className="border-gray-300">
          <Table.HeadCell>Nome da Área</Table.HeadCell>
          <Table.HeadCell>Espécie</Table.HeadCell>
          <Table.HeadCell>Variedade</Table.HeadCell>
          <Table.HeadCell>Área Cultivada</Table.HeadCell>
          <Table.HeadCell>Detalhes</Table.HeadCell>
          <Table.HeadCell>Editar</Table.HeadCell>
          <Table.HeadCell>Excluir</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {areaArray.map((area) => {
            return <Area key={area.id} {...area} />;
          })}
        </Table.Body>
      </Table>
    </Flowbite>
  );
};
export default AreasContainer;
