import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllAreas } from '../../features/area/areaSlice';
import { Link } from 'react-router-dom';
import { Table, Flowbite, Button, Modal } from 'flowbite-react';

const FildsNotebookContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const propertyId = localStorage.getItem('propertyId');
    if (propertyId) {
      dispatch(getAllAreas(JSON.parse(propertyId)));
    }
  }, []);

  const [openModal, setOpenModal] = useState();
  const emailInputRef = useRef(null);
  const props = { openModal, setOpenModal, emailInputRef };

  return (
    <Flowbite>
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
                <Modal.Body>{/* <CreateCrop /> */}</Modal.Body>
              </Modal>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Table className="mb-4">
        <Table.Body>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>
              <Link to="/create-application">
                <Button gradientDuoTone="greenToBlue" outline>
                  + Adicionar nova aplicação
                </Button>
              </Link>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Table>
        <Table.Body>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>
              <Link to="/other-activities">
                <Button gradientDuoTone="greenToBlue" outline>
                  + Adicionar novo manejo
                </Button>
              </Link>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Flowbite>
  );
};
export default FildsNotebookContainer;
