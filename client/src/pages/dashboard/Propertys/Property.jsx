import { useDispatch } from 'react-redux';
import {
  deleteProperty,
  setEditProperty,
} from '../../../features/property/propertySlice';
import { addPropertyToLocalStorage } from '../../../utils/localStorage';
import { Table, Radio, Flowbite, Modal, Button } from 'flowbite-react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { useState, useRef } from 'react';
import CreateProperty from './CreateProperty';

const Property = ({ id, name, total_area, cultivated_area, city, state }) => {
  const dispatch = useDispatch();

  const handleSelectProperty = () => {
    addPropertyToLocalStorage(id, name);
    window.location.reload();
  };

  const [openModal, setOpenModal] = useState();
  const emailInputRef = useRef(null);
  const props = { openModal, setOpenModal, emailInputRef };

  return (
    <Flowbite>
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="p-4">
          <Radio onClick={handleSelectProperty} />
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {name}
        </Table.Cell>
        <Table.Cell>{city}</Table.Cell>
        <Table.Cell>{total_area}</Table.Cell>
        <Table.Cell>{cultivated_area}</Table.Cell>
        <Table.Cell>
          <button
            style={{ color: 'black' }}
            onClick={() => {
              dispatch(
                setEditProperty({
                  property_id: id,
                  name,
                  city,
                  state,
                  total_area,
                  cultivated_area,
                }),
              );
              props.setOpenModal('initial-focus');
            }}
          >
            <AiOutlineEdit />
          </button>
          <Modal
            show={props.openModal === 'initial-focus'}
            size="md"
            popup
            onClose={() => props.setOpenModal(undefined)}
            initialFocus={props.emailInputRef}
          >
            <Modal.Header />
            <Modal.Body>
              <CreateProperty />
            </Modal.Body>
          </Modal>
        </Table.Cell>
        <Table.Cell>
          <button
            type="button"
            onClick={() => dispatch(deleteProperty(id))}
            style={{ color: 'red' }}
          >
            <BsTrash />
          </button>
        </Table.Cell>
      </Table.Row>
    </Flowbite>
  );
};
export default Property;
